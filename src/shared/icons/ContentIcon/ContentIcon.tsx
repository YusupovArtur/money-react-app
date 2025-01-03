import { FC } from 'react';
import { BeautyIcons } from './ContentIconSets/BeautyIcons.tsx';
import { BuildingIcons } from './ContentIconSets/BuildingIcons.tsx';
import { CompanyIcons } from './ContentIconSets/CompanyIcons.tsx';
import { EducationIcon } from './ContentIconSets/EducationIcons.tsx';
import { ElectronicIcons } from './ContentIconSets/ElectronicsIcons.tsx';
import { FamilyIcons } from './ContentIconSets/FamilyIcons.tsx';
import { FinanceIcons } from './ContentIconSets/FinanceIcons.tsx';
import { FoodIcons } from './ContentIconSets/FoodIcons.tsx';
import { GoodsIcons } from './ContentIconSets/GoodsIcons.tsx';
import { HealthIcons } from './ContentIconSets/HealthIcons.tsx';
import { HouseholdIcons } from './ContentIconSets/HouseholdIcons.tsx';
import { PaymentIcons } from './ContentIconSets/PaymentIcons.tsx';
import { RecreationIcons } from './ContentIconSets/RecreationIcons.tsx';
import { SportIcons } from './ContentIconSets/SportIcons.tsx';
import { TransportIcons } from './ContentIconSets/TransportIcons.tsx';
import { SpecialIcons } from './ContentIconSets/SpecialIcons.tsx';

interface ContentIconProps {
  iconName: string;
  iconSize: `${number}rem`;
}

export const ContentIcon: FC<ContentIconProps> = ({ iconName, iconSize }) => {
  let icon = BeautyIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = BuildingIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = CompanyIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = EducationIcon({ iconName, iconSize });
  if (icon) return icon;

  icon = ElectronicIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = FamilyIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = FinanceIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = FoodIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = GoodsIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = HealthIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = HouseholdIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = PaymentIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = RecreationIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = SportIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = TransportIcons({ iconName, iconSize });
  if (icon) return icon;

  icon = SpecialIcons({ iconName, iconSize });
  if (icon) return icon;

  return <div style={{ width: iconSize, height: iconSize }}></div>;
};
