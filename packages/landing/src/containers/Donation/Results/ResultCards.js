import React, { useState } from 'react';
// NEXT
// LIBRAIRIES
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Divider, Empty, Menu, Timeline, Affix } from 'antd';
// COMPONENTS
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Button from 'common/components/Button';
import LottieAnimation from 'common/components/Lottie/index';
// LOTTIE ANIMATION
import loading1 from 'common/assets/image/lottie/laboratory-icon.json';
// STYLE
import {
  CardBody,
  CardTop,
  PatientInfo,
  PatientName,
  Result,
  ResultsWrapper,
  ResultWrapper,
  TitleWrapper
} from './results.style';
// UTILS
import localeStringOptions from 'common/utils/localeStringOptions';
import toDateTime from 'common/utils/secondToDate';
//ICONS
import { Icon } from 'react-icons-kit';
import { send } from 'react-icons-kit/feather/send';
import { moreHorizontal } from 'react-icons-kit/feather/moreHorizontal';
import { moreVertical } from 'react-icons-kit/feather/moreVertical';
import { user } from 'react-icons-kit/feather/user';
import { edit } from 'react-icons-kit/feather/edit';
import { download } from 'react-icons-kit/feather/download';
import { trash2 } from 'react-icons-kit/feather/trash2';
import { checkSquare } from 'react-icons-kit/feather/checkSquare';
import { mail } from 'react-icons-kit/feather/mail';
import { plus } from 'react-icons-kit/feather/plus';
import { clock } from 'react-icons-kit/feather/clock';
import { checkCircle } from 'react-icons-kit/feather/checkCircle';
import { xCircle } from 'react-icons-kit/feather/xCircle';

const { SubMenu } = Menu;

const ResultCards = ({ setTest, tests }) => {
  const [currentMenuKey, setCurrentMenuKey] = useState('settings:add');
  return (
    <ResultsWrapper>
      <Timeline>
        {tests ? (
          tests?.map(
            (
              {
                id,
                result,
                fullName,
                birthday,
                createdAt,
                email,
                phoneNumber,
                ssn
              },
              index
            ) => (
              <Timeline.Item
                key={`result-card-key-${index}`}
                mode="alternate"
                color={
                  result === 'negative'
                    ? 'green'
                    : result === 'positive'
                    ? 'red'
                    : 'blue'
                }
                dot={
                  <Icon
                    icon={
                      result === 'negative'
                        ? checkCircle
                        : result === 'positive'
                        ? xCircle
                        : clock
                    }
                  />
                }
              >
                <Result
                /* className={result ? 'result' : ' '} */
                >
                  <ActionMenu
                    onClick={setCurrentMenuKey}
                    selectedKeys={[currentMenuKey]}
                    expandIcon={(props) => {
                      return (
                        <Icon
                          icon={
                            props.isOpen === true
                              ? moreVertical
                              : moreHorizontal
                            //moreHorizontal
                          }
                          size={20}
                        />
                      );
                    }}
                    triggerSubMenuAction="click"
                    mode="vertical"
                    style={{
                      background: 'transparent',
                      borderRight: 'none'
                    }}
                  >
                    <SubMenu
                      key="SubMenu"
                      popupOffset={[22, 0]}
                      popupClassName={'result-card-more'}
                    >
                      <Menu.Item
                        key="setting:update"
                        icon={<Icon icon={result ? checkSquare : edit} />}
                        onClick={() =>
                          setTest({
                            id,
                            result,
                            fullName,
                            createdAt
                          })
                        }
                      >
                        {result ? 'Mettre à jour' : 'Ajouter'} le résultat
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="setting:send" icon={<Icon icon={mail} />}>
                        Envoyer le résultat (Email)
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        key="setting:download"
                        icon={<Icon icon={download} />}
                      >
                        Télécharger le résultat (PDF)
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        key="setting:delete"
                        icon={<Icon icon={trash2} />}
                      >
                        Supprimer le résultat
                      </Menu.Item>
                      <Menu.Item
                        disabled
                        key="setting:profile"
                        icon={<Icon icon={user} />}
                      >
                        Voir le profil patient
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        disabled
                        key="setting:sms"
                        icon={<Icon icon={send} />}
                      >
                        Envoyer un SMS
                      </Menu.Item>
                    </SubMenu>
                  </ActionMenu>
                  <CardTop className="cardTop">
                    <TitleWrapper>
                      <Heading
                        as="h3"
                        content={
                          typeof createdAt === 'string'
                            ? createdAt
                            : toDateTime(createdAt?.seconds).toLocaleString(
                                'fr-FR',
                                localeStringOptions
                              )
                        }
                      />
                      <Text as="p" content={id} />
                    </TitleWrapper>
                    <PatientName>
                      <Heading as="h4" content={fullName} />
                    </PatientName>
                  </CardTop>
                  <CardBody>
                    <ResultWrapper className="result">
                      {result ? (
                        <Text
                          as="span"
                          className="result"
                          content={
                            result === 'negative' ? 'Négatif' : 'Positif'
                          }
                        />
                      ) : (
                        <>
                          <ResultLabel>
                            <Text
                              as="span"
                              className="resultLabel"
                              content={'En attente du résultat'}
                            />
                            <Button
                              title={'Ajouter le résultat'}
                              icon={<Icon icon={plus} />}
                              iconPosition={'right'}
                              colors={'primary'}
                              variant={'extendedFab'}
                              type={'button'}
                              onClick={() =>
                                setTest({
                                  id,
                                  result,
                                  fullName,
                                  createdAt
                                })
                              }
                            />
                          </ResultLabel>
                          <LottieAnimation animation={loading1} />
                        </>
                      )}
                    </ResultWrapper>
                    <PatientInfo className="patientInfo">
                      <Text
                        as="span"
                        className="patientInfoLabel"
                        content={phoneNumber}
                      />
                      <Text
                        as="span"
                        className="patientInfoLabel"
                        content={email}
                      />
                      <Text
                        as="span"
                        className="patientInfoLabel"
                        content={birthday}
                      />
                      <Text
                        as="span"
                        className="patientInfoLabel"
                        content={ssn}
                      />
                    </PatientInfo>
                  </CardBody>
                </Result>
              </Timeline.Item>
            )
          )
        ) : (
          <Empty description="Pas encore de résultat" />
        )}
      </Timeline>
      <Divider />
    </ResultsWrapper>
  );
};

const ActionMenu = styled(Menu)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 20px 0;
  background: transparent;
  color: ${themeGet('colors.labelColor')};

  &:hover {
    color: ${themeGet('colors.primary')};
  }

  ul {
    background: transparent;
  }

  .ant-menu-submenu-arrow {
    display: none;
  }
`;
const ResultLabel = styled.div`
  display: flex;
  flex-direction: column;

  > span.resultLabel {
    font-size: 1.5rem;
    color: ${themeGet('colors.labelColor')};
  }
`;

export default ResultCards;
