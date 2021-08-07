import React, {useState} from 'react';
// LIBRAIRIES
import { Tooltip, Progress} from 'antd';
import {Bar} from 'react-chartjs-2';
// COMPONENTS
import Text from 'common/components/Text';
// STYLE
import  {
    DonationProgressbar,
    BarArea,
    CurrentStatus
} from './results.style';
// UTILS
import colors from 'common/theme/donation/colors.js';


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
const ResultsChart = (props) => {
    return (
        <DonationProgressbar>
            <Bar config={chartConfig} data={chartData}/>
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
                    success={{percent: 30, strokeColor: colors.success}}
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
    );
};

export default ResultsChart;
