import React from 'react';
import BeautyIcon from 'components/small_components/icons_svg/icon_sets/BeautyIcons';
import BuildingIcon from 'components/small_components/icons_svg/icon_sets/BuildingsIconsSVG';
import CompanyIcon from 'components/small_components/icons_svg/icon_sets/CompanyIconsSVG';
import EducationIcon from 'components/small_components/icons_svg/icon_sets/EducationIcons';
import ElectronicsIcon from 'components/small_components/icons_svg/icon_sets/ElectronicsIcons';
import FamilyIcon from 'components/small_components/icons_svg/icon_sets/FamilyIcons';
import FinanceIcon from 'components/small_components/icons_svg/icon_sets/FinanceIconsSVG';
import FoodIcon from 'components/small_components/icons_svg/icon_sets/FoodsIcons';
import GoodsIcon from 'components/small_components/icons_svg/icon_sets/GoodsIcons';
import HealthIcon from 'components/small_components/icons_svg/icon_sets/HealthIconsSVG';
import HouseIcon from 'components/small_components/icons_svg/icon_sets/HouseIcons';
import PaymentIcon from 'components/small_components/icons_svg/icon_sets/PaymentsIcons';
import RecreationIcon from 'components/small_components/icons_svg/icon_sets/RecreationIcons';
import SportIcon from 'components/small_components/icons_svg/icon_sets/SportIcons';
import TransportIcon from 'components/small_components/icons_svg/icon_sets/TransportIconsSVG';

const isDivContainer = (node: React.ReactNode): boolean => {
  if (React.isValidElement(node)) {
    const { type } = node;
    return type === 'div';
  }
  return false;
};

const ContentIcon: React.FC<{ iconName: string; iconSize: string }> = ({ iconName, iconSize }) => {
  let icon: React.ReactNode = null;

  icon = BeautyIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = BuildingIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = CompanyIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = EducationIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = ElectronicsIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = FamilyIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = FinanceIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = FoodIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = GoodsIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = HealthIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = HouseIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = PaymentIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = RecreationIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = SportIcon({ iconName: iconName, iconSize: iconSize });
  if (!isDivContainer(icon)) return icon;

  icon = TransportIcon({ iconName: iconName, iconSize: iconSize });
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
