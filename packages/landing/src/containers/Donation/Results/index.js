import React, { useState } from 'react';
// NEXT
import Link from 'next/link';
// LIBRAIRIES
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { Menu, Tooltip, Progress, Empty, BackTop, Divider } from 'antd';
import { Bar } from 'react-chartjs-2';

// COMPONENTS
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Button from 'common/components/Button';
import LottieAnimation from 'common/components/Lottie/index';
// LOTTIE ANIMATION
import loading from 'common/assets/image/lottie/laboratorio.json';
import loading1 from 'common/assets/image/lottie/laboratory-icon.json';
// STYLE
import SectionWrapper, {
  ContentArea,
  TitleWrapper,
  TextWrapper,
  ResultsWrapper,
  DonationProgressbar,
  BarArea,
  CurrentStatus,
  ResultCard,
  CardTop,
  CardBody,
  Result,
  PatientInfo,
  PatientName
} from './results.style';
// UTILS
import localeStringOptions from 'common/utils/localeStringOptions';
import colors from 'common/theme/donation/colors.js';
import toDateTime from 'common/utils/secondToDate';
//ICONS
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';
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
import { arrowUp } from 'react-icons-kit/feather/arrowUp';
import ResultForm from './resultForm';
//FIREBASE
import { setDocument } from 'common/lib/firebase/firebase.util';
import { serverTimestamp } from 'common/lib/firebase/firebase';
const { SubMenu } = Menu;

const chartData = {
  labels: [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche'
  ],
  datasets: [
    {
      label: '# de test positif',
      data: [1, 4, 13, 3, 12, 8, 5],
      backgroundColor: [
        colors.errorFocus,
        colors.errorFocus,
        colors.errorFocus,
        colors.errorFocus,
        colors.errorFocus,
        colors.errorFocus,
        colors.errorFocus
      ],
      borderColor: [
        colors.primary,
        colors.primary,
        colors.primary,
        colors.primary,
        colors.primary,
        colors.primary,
        colors.primary
      ],
      borderWidth: 1
    },
    {
      label: '# de test négatif',
      data: [12, 19, 3, 5, 2, 3, 8],
      backgroundColor: [
        colors.successFocus,
        colors.successFocus,
        colors.successFocus,
        colors.successFocus,
        colors.successFocus,
        colors.successFocus,
        colors.successFocus
      ],
      borderColor: [
        colors.slogan,
        colors.slogan,
        colors.slogan,
        colors.slogan,
        colors.slogan,
        colors.slogan,
        colors.slogan
      ],
      borderWidth: 1
    }
  ]
};
const chartConfig = {
  type: 'bar',
  data: chartData,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};
const Results = ({ tests }) => {
  const data = JSON.parse(tests);
  const [currentMenuKey, setCurrentMenuKey] = useState('settings:add');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const onOk = async (values) => {
    await setDocument(
      'tests',
      values.testId,
      {
        testId: values.testId,
        result: values.result,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
    setResult(null);
  };
  return (
    <SectionWrapper>
      <ResultForm
        result={result}
        isVisible={result !== null}
        onCancel={() => {
          setResult(null);
        }}
        onOk={onOk}
      />
      <BackTop>
        <BackTopLabel>
          <Icon icon={arrowUp} size={30} />
        </BackTopLabel>
      </BackTop>
      <Container>
        <ContentArea>
          <TextWrapper>
            <Heading content="Mettez à jour les formulaires patients COVID-19" />
            <p className="desc">
              Retrouvez une liste de tous les formulaires de prise de contact et
              cliquer simplement sur une entrée pour y ajouter le résultat,
              l'identifiant et le document. Les données seront automatiquement
              envoyé à la sécurité sociale.
              <Link href="#learn-more">
                <a>
                  En savoir plus <Icon icon={chevronRight} />
                </a>
              </Link>
            </p>
            <DonationProgressbar>
              <Bar config={chartConfig} data={chartData} />
              <BarArea>
                <CurrentStatus>
                  <strong>24</strong> sur 230 test traités
                </CurrentStatus>
                <Text
                  className="last-donate-time"
                  content="Dernier test il y a 5m"
                />
              </BarArea>
              <Tooltip title={`3 positifs / 3 négatifs / 4 à réaliser`}>
                <Progress
                  success={{ percent: 30, strokeColor: colors.success }}
                  strokeColor={colors.errorFocus}
                  percent={60}
                  strokeWidth={5}
                  status="active"
                  showInfo={false}
                />
              </Tooltip>
              {/* <Heading as="h5" content="54 tests réalisés aujourd'hui" />
              <Heading as="h5" content="21 tests réalisés cette semaine" />
              <Heading as="h5" content="10 tests réalisés le mois dernier" /> */}
            </DonationProgressbar>
          </TextWrapper>
          <ResultsWrapper>
            {data ? (
              data.map(
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
                  <ResultCard
                    key={`result-card-key-${index}`}
                    /* className={result ? 'result' : ' '} */
                  >
                    <ActionMenu
                      onClick={setCurrentMenuKey}
                      selectedKeys={[currentMenuKey]}
                      expandIcon={
                        <Icon
                          icon={
                            //menuOpen === true ? moreVertical : moreHorizontal
                            moreHorizontal
                          }
                          size={20}
                        />
                      }
                      /* onOpenChange={(open) => {
                          setMenuOpen(open.length === 0);
                        }} */
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
                          key="setting:add"
                          icon={<Icon icon={checkSquare} />}
                        >
                          Ajouter le résultat
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          key="setting:update"
                          icon={<Icon icon={edit} />}
                          onClick={() =>
                            setResult({
                              id,
                              result,
                              fullName,
                              createdAt
                            })
                          }
                        >
                          Mettre à jour le resultat
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          key="setting:send"
                          icon={<Icon icon={mail} />}
                        >
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
                          content={toDateTime(
                            createdAt?.seconds
                          ).toLocaleString('fr-FR', localeStringOptions)}
                        />
                        <Text as="p" content={id} />
                      </TitleWrapper>
                      <PatientName>
                        <Heading as="h4" content={fullName} />
                      </PatientName>
                    </CardTop>
                    <CardBody>
                      <Result className="result">
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
                                title="Ajouter le résultat"
                                icon={<Icon icon={plus} />}
                                iconPosition={'right'}
                                colors={'primary'}
                                variant="extendedFab"
                                type="button"
                                onClick={() =>
                                  setResult({
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
                      </Result>
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
                  </ResultCard>
                )
              )
            ) : (
              <Empty description="Pas encore de résultat" />
            )}
            <Divider />
          </ResultsWrapper>
        </ContentArea>
      </Container>
    </SectionWrapper>
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
    background: 'transparent';
  }
  .ant-menu-submenu-arrow {
    display: 'none';
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
const BackTopLabel = styled(BackTop)`
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 14px;
  background-color: ${themeGet('colors.primary')};
  color: #fff;
  text-align: center;
  font-size: 14px;
  &::hover {
    background-color: ${themeGet('colors.primaryHover')};
  }
`;

export default Results;
