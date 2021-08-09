import React, { useState } from 'react';
// NEXT
// PACKAGES
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Divider, Empty, Menu, Timeline, message, Popconfirm } from 'antd';
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
// LIB
import { getDownloadURL } from 'common/lib/firebase/firebase.util';
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
import { functions } from 'common/lib/firebase/firebase';

const { SubMenu } = Menu;

const ResultCards = ({ setTest, tests }) => {
  const [currentMenuKey, setCurrentMenuKey] = useState('settings:add');
  const [downloadURL, setDownloadURL] = useState('');
  const handleSend = async (email, fullName) => {
    const sendMail = await functions.httpsCallable('sendMail');
    await sendMail({
      email: email,
      fullName: fullName
    });
  };
  const getURL = async (documentPath) => {
    setDownloadURL(await getDownloadURL(documentPath));
  };
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
                ssn,
                documentPath
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
                            //props.isOpen ? moreVertical : moreHorizontal
                            moreHorizontal
                          }
                          size={20}
                          style={{
                            transform: props.isOpen ? 'none' : 'rotate(90deg)',
                            transition: '0.1s ease-in-out'
                          }}
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
                            createdAt,
                            email
                          })
                        }
                      >
                        {result ? 'Mettre à jour' : 'Ajouter'} le résultat
                      </Menu.Item>
                      <Menu.Divider />
                      {documentPath && getURL(documentPath) && (
                        <>
                          <Menu.Item
                            key="setting:send"
                            icon={<Icon icon={mail} />}
                            onClick={async () => {
                              message.loading('Chargement...', 0);
                              await handleSend(email, fullName);
                              message.destroy();
                              message.success('Envoyé', 3);
                            }}
                          >
                            Envoyer le résultat (Email)
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item
                            key="setting:download"
                            icon={<Icon icon={download} />}
                          >
                            <a href={downloadURL} download>
                              Télécharger le résultat (PDF)
                            </a>
                          </Menu.Item>
                          <Menu.Divider />
                        </>
                      )}
                      <Popconfirm
                        placement="leftTop"
                        title={
                          'Êtes-vous sûr de vouloir supprimer le test? ' +
                          'Cette action est irréversible'
                        }
                        //onConfirm={confirm}
                        okText="Oui"
                        cancelText="Non"
                      >
                        <Menu.Item
                          key="setting:delete"
                          icon={<Icon icon={trash2} />}
                        >
                          Supprimer le test
                        </Menu.Item>
                      </Popconfirm>
                      <Menu.Divider />
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
                        Envoyer par SMS
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
                                  createdAt,
                                  email
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
