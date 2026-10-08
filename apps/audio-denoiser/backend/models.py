import torch
import torch.nn as nn
from torchvision.models import resnet18, ResNet18_Weights


def build_classifier(num_classes):
    model = resnet18(weights=ResNet18_Weights.DEFAULT)
    model.fc = nn.Sequential(
        nn.Dropout(0.3),
        nn.Linear(model.fc.in_features, num_classes)
    )
    return model


class UNetBlock(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch), nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1),
            nn.BatchNorm2d(out_ch), nn.ReLU(inplace=True),
        )
    def forward(self, x): return self.conv(x)


class UNetDenoiser(nn.Module):
    def __init__(self, ch=None):
        super().__init__()
        if ch is None: ch = [1, 16, 32, 64, 128]
        self.enc1       = UNetBlock(ch[0], ch[1])
        self.enc2       = UNetBlock(ch[1], ch[2])
        self.enc3       = UNetBlock(ch[2], ch[3])
        self.bottleneck = UNetBlock(ch[3], ch[4])
        self.pool = nn.MaxPool2d(2)
        self.up3  = nn.ConvTranspose2d(ch[4], ch[3], 2, stride=2)
        self.dec3 = UNetBlock(ch[4], ch[3])
        self.up2  = nn.ConvTranspose2d(ch[3], ch[2], 2, stride=2)
        self.dec2 = UNetBlock(ch[3], ch[2])
        self.up1  = nn.ConvTranspose2d(ch[2], ch[1], 2, stride=2)
        self.dec1 = UNetBlock(ch[2], ch[1])
        self.out  = nn.Conv2d(ch[1], 1, 1)

    @staticmethod
    def _match(up, skip):
        dh = skip.shape[2] - up.shape[2]
        dw = skip.shape[3] - up.shape[3]
        if dh > 0 or dw > 0:
            up = torch.nn.functional.pad(up, [0, dw, 0, dh])
        return up

    def forward(self, x):
        e1 = self.enc1(x)
        e2 = self.enc2(self.pool(e1))
        e3 = self.enc3(self.pool(e2))
        b  = self.bottleneck(self.pool(e3))
        d3 = self.dec3(torch.cat([self._match(self.up3(b),  e3), e3], dim=1))
        d2 = self.dec2(torch.cat([self._match(self.up2(d3), e2), e2], dim=1))
        d1 = self.dec1(torch.cat([self._match(self.up1(d2), e1), e1], dim=1))
        return self.out(d1)


class AutoencoderDenoiser(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Conv2d(1, 32, 3, stride=2, padding=1),  nn.ReLU(),
            nn.Conv2d(32, 64, 3, stride=2, padding=1), nn.ReLU(),
            nn.Conv2d(64, 128, 3, stride=2, padding=1), nn.ReLU(),
        )
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(128, 64, 3, stride=2, padding=1, output_padding=1), nn.ReLU(),
            nn.ConvTranspose2d(64, 32, 3, stride=2, padding=1, output_padding=1),  nn.ReLU(),
            nn.ConvTranspose2d(32, 1, 3, stride=2, padding=1, output_padding=1),
        )
    def forward(self, x): return self.decoder(self.encoder(x))


class DilatedBlock(nn.Module):
    def __init__(self, channels, dilation):
        super().__init__()
        self.conv = nn.Conv2d(channels, channels, 3,
                              padding=dilation, dilation=dilation)
        self.bn  = nn.BatchNorm2d(channels)
        self.act = nn.ReLU()
    def forward(self, x): return x + self.act(self.bn(self.conv(x)))


class WaveNetStyleDenoiser(nn.Module):
    def __init__(self, channels=64):
        super().__init__()
        self.input_conv = nn.Conv2d(1, channels, 3, padding=1)
        self.dilated = nn.Sequential(
            DilatedBlock(channels, 1),  DilatedBlock(channels, 2),
            DilatedBlock(channels, 4),  DilatedBlock(channels, 8),
            DilatedBlock(channels, 16), DilatedBlock(channels, 1),
            DilatedBlock(channels, 2),
        )
        self.output_conv = nn.Sequential(
            nn.Conv2d(channels, channels // 2, 1), nn.ReLU(),
            nn.Conv2d(channels // 2, 1, 1)
        )
    def forward(self, x): return self.output_conv(self.dilated(self.input_conv(x)))
