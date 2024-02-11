import React from 'react';
import { Col, Row } from 'react-bootstrap';
import * as CiIcons from 'react-icons/ci';

interface IconChooserProps {
  onIconClick: (clickedIconName: string) => void;
}

export const IconChooser: React.FC<IconChooserProps> = ({ onIconClick }) => {
  const iconList = [
    'CiWifiOn', 'CiVirus', 'CiWallet', 'CiStethoscope', 'CiSpeaker', 'CiShoppingCart', 'CiShoppingBasket', 'CiRouter',
    'CiRead', 'CiPlug1', 'CiPlane', 'CiPizza', 'CiPickerHalf', 'CiPen', 'CiPassport1', 'CiHospital1', 'CiHeart',
    'CiGlobe', 'CiGift', 'CiFries', 'CiAirportSign1', 'CiApple', 'CiAvocado', 'CiBadgeDollar', 'CiBank', 'CiBandage',
    'CiBasketball', 'CiBeaker1', 'CiBeerMugFull', 'CiBitcoin', 'CiBrightnessUp', 'CiBullhorn', 'CiBurger', 'CiCamera',
    'CiCoffeeBean', 'CiCoffeeCup', 'CiCoinInsert', 'CiDark', 'CiDeliveryTruck', 'CiDesktop', 'CiDroplet', 'CiDumbbell',
    'CiForkAndKnife',
  ];

  const [clickedIconIndex, setClickedIconIndex] = React.useState<number | null>(null);

  const handleClick = (index: number) => {
    setClickedIconIndex(index);
    onIconClick && onIconClick(iconList[index]);
  };

  return (
    <div className='icon-chooser'>
      <p>Choose icon</p>
      <Row className='icon-row'>
        {iconList.map((iconName, index) => (
          <Col key={index} xs={3}>
            <div className={`col ${index === clickedIconIndex ? 'clicked' : ''}`} onClick={() => handleClick(index)}>
              {React.createElement((CiIcons as any)[iconName])}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
