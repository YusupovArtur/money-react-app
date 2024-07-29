import { FC, isValidElement, ReactNode } from 'react';
import BeautyIcon from './BeautyIcons';
import BuildingIcon from './BuildingsIconsSVG';
import CompanyIcon from './CompanyIconsSVG';
import EducationIcon from './EducationIcons';
import ElectronicsIcon from './ElectronicsIcons';
import FamilyIcon from './FamilyIcons';
import FinanceIcon from './FinanceIconsSVG';
import FoodIcon from './FoodsIcons';
import GoodsIcon from './GoodsIcons';
import HealthIcon from './HealthIconsSVG';
import HouseIcon from './HouseIcons';
import PaymentIcon from './PaymentsIcons';
import RecreationIcon from './RecreationIcons';
import SportIcon from './SportIcons';
import TransportIcon from './TransportIconsSVG';

// TODO: Need to refactor ContentIconSets
const isDivContainer = (node: ReactNode): boolean => {
  if (isValidElement(node)) {
    const { type } = node;
    return type === 'div';
  }
  return false;
};

const ContentIcon: FC<{ iconName: string; iconSize: string }> = ({ iconName, iconSize }) => {
  let icon: ReactNode = null;

  icon = BeautyIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = BuildingIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = CompanyIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = EducationIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = ElectronicsIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = FamilyIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = FinanceIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = FoodIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = GoodsIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = HealthIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = HouseIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = PaymentIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = RecreationIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = SportIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = TransportIcon({ iconName, iconSize });
  if (!isDivContainer(icon)) return icon;

  return <div style={{ width: iconSize, height: iconSize }}></div>;
};

export const WALLET_ICONS_FIELD: string[][] = [
  ['Sberbank', 'Tinkoff', 'AlfaBank', 'VTB', 'GazpromBank', 'Raiffeisen'],
  ['Card', 'CardFill', 'Cash', 'CashStack', 'CashCoin', 'Bank'],
  ['PiggyBank', 'Wallet', 'WalletFill', 'Percent', 'GraphArrow', 'BarChartLineFill'],
  ['HouseFill', 'BuildingFill', 'BuildingsFill', 'CarFill', 'TruckFront', ''],
];

export const CATEGOTY_ICONS_FIELD: string[][] = [
  [''],
  ['BasketFill', 'BasketFill2', 'Cart', 'CartFill', 'Fastfood', 'Cafe', 'Cup'],
  ['Cloth', 'Shoes', 'Watch'],
  [
    'Car',
    'CarFill',
    'Parking',
    'FuelPump',
    'Bus',
    'BusFill',
    'Taxi',
    'TruckFront',
    'Truck',
    'Airplane',
    'AirplaneFill',
    'Train',
    'TrainFill',
    'Scooter',
    'Bicycle',
  ],
  ['Rosneft', 'Sberbank', 'VTB', 'Tinkoff', 'AlfaBank', 'GazpromBank', 'Raiffeisen'],
  ['FileText', 'FileTextFill', 'Droplet', 'Globe2', 'WIFI', 'RouterFill', 'SIMFill'],
  ['MusicNote', 'Film', 'Wine', 'Ticket', 'TicketFill', 'Suitcase', 'SuitcaseFill', 'Backpack', 'BackpackFill'],
  ['CPU', 'Phone', 'Telephone', 'TelephoneFill', 'Display', 'DisplayPC', 'Controller', 'Headset'],
  [
    'Cash',
    'CashCoin',
    'CashStack',
    'Wallet',
    'WalletFill',
    'Card',
    'CardFill',
    'Bank',
    'PiggyBank',
    'Percent',
    'GraphArrow',
    'BarChartLineFill',
  ],
  ['Furniture', 'Spray', 'Washing', 'Hammer', 'Tools', 'Brush'],
  ['House', 'HouseFill', 'Building', 'BuildingFill', 'Buildings', 'BuildingsFill'],
  ['Book', 'BookFill', 'Journal', 'HatGraduate'],
  ['Cross', 'Capsule', 'CapsulePill', 'Hospital', 'HospitalFill', 'Tooth', 'Stethoscope'],
  ['Scissors', 'Toothbruth', 'Cream', 'Pomade', 'Nail'],
  ['Dumbbell', 'Ball'],
  ['Family', 'Children', 'GiftFill', 'Pet', 'Toys'],
];

export default ContentIcon;
