import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveLine } from '@nivo/line';

import './LineChart.css';

const LineChart = () => {
    const [revenuMensuel, setRevenuMensuel] = useState([]);

    useEffect(() => {
        fetchRevenuMensuel();
    }, []);

    const fetchRevenuMensuel = async () => {
        try {
            const response = await axios.get('http://localhost:3001/revenu/mensuel');
            setRevenuMensuel(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération du revenu mensuel : ', error);
        }
    };

    const formatDataForLineChart = () => {
        if (!Array.isArray(revenuMensuel)) {
            return [];
        }
        return revenuMensuel.map(item => ({
            x: item.month,
            y: item.revenue
        }));
    };

    const data = [
        {
            id: 'Revenu',
            data: [//formatDataForLineChart()
            { x: 'Janvier', y: 0 },
            { x: 'Février', y: 0 },
            { x: 'Mars', y: 0 },
            { x: 'Avril', y: 0 },
            { x: 'Mai', y: 4590 },

            ],
            
        }
    ];

    return (
        <div className="container">

        <section className="attendance">
            <div className="attendance-list">
                <div className='lin' style={{ height: '80vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
                    <h2 style={{ textAlign: 'center' }}>My line chart</h2>
                    <div style={{ height: 'calc(100% - 40px)', width: '159vh' }}>
                        <ResponsiveLine
                            data={data}
                            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                            xScale={{ type: 'point' }}
                            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                            axisBottom={{
                                orient: 'bottom',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Month',
                                legendOffset: 36,
                                legendPosition: 'middle',
                            }}
                            axisLeft={{
                                orient: 'left',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Sales',
                                legendOffset: -40,
                                legendPosition: 'middle',
                            }}
                            colors={['#6E72FF']}
                            lineWidth={4}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabelYOffset={-12}
                            useMesh={true}
                            legends={[
                                {
                                    anchor: 'bottom-right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 100,
                                    translateY: 0,
                                    itemsSpacing: 0,
                                    itemDirection: 'left-to-right',
                                    itemWidth: 80,
                                    itemHeight: 20,
                                    itemOpacity: 0.75,
                                    symbolSize: 12,
                                    symbolShape: 'circle',
                                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemBackground: 'rgba(0, 0, 0, .03)',
                                                itemOpacity: 1,
                                            },
                                        },
                                    ],
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default LineChart;
