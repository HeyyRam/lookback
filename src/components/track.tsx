import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';


const months = [
    { name: 'January', days: 31 },
    { name: 'February', days: 28 }, // Note: You might want to handle leap years
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 }
];

function Track() {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11
    const currentDay = today.getDate(); // 1-31

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography
                component={motion.h1}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                variant="h3"
                sx={{
                    textAlign: 'center',
                    mb: 4,
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                }}
            >
                LookBack at Your Year
            </Typography>

            <Grid container spacing={3}>
                {months.map((month, index) => (
                    <Grid item xs={12} md={6} lg={4} key={month.name}>
                        <Card
                            component={motion.div}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            sx={{
                                background: 'linear-gradient(45deg, #343a40 30%, #495057 90%)',
                                borderRadius: 2,
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: 'white',
                                        mb: 2,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {month.name}
                                </Typography>
                                
                                <Grid container spacing={1}>
                                    {[...Array(month.days)].map((_, dayIndex) => (
                                        <Grid item xs={2} key={dayIndex}>
                                            <Box
                                                component={motion.div}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                sx={{
                                                    width: '100%',
                                                    paddingTop: '100%',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    background: index === currentMonth && dayIndex + 1 === currentDay 
                                                        ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                                                        : 'rgba(255,255,255,0.1)',
                                                    borderRadius: 1,
                                                    border: index === currentMonth && dayIndex + 1 === currentDay 
                                                        ? '2px solid #fff'
                                                        : 'none',
                                                    '&:hover': {
                                                        background: index === currentMonth && dayIndex + 1 === currentDay 
                                                            ? 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)'
                                                            : 'rgba(255,255,255,0.2)',
                                                    },
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        color: 'white',
                                                        fontSize: '0.8rem',
                                                        fontWeight: index === currentMonth && dayIndex + 1 === currentDay 
                                                            ? 'bold'
                                                            : 'normal',
                                                    }}
                                                >
                                                    {dayIndex + 1}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Track;
