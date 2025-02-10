import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { db, auth } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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

const emotions = {
  happy: { color: '#4caf50', label: 'Happy' },
  neutral: { color: '#ffeb3b', label: 'Neutral' },
  sad: { color: '#f44336', label: 'Sad' }
};

interface SelectedDate {
    month: number;
    day: number;
}

interface EmotionData {
    [key: string]: 'happy' | 'neutral' | 'sad';
}

function Track() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [emotionData, setEmotionData] = useState<EmotionData>({});
    
    useEffect(() => {
        fetchEmotionData();
    }, []);

    const fetchEmotionData = async () => {
        if (!auth.currentUser) return;
        
        const year = new Date().getFullYear();
        const docRef = doc(db, 'emotions', `${auth.currentUser.uid}_${year}`);
        
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setEmotionData(docSnap.data());
            }
        } catch (error) {
            console.error("Error fetching emotion data:", error);
        }
    };

    const handleDayClick = (monthIndex: number, day: number) => {
        setSelectedDate({ month: monthIndex, day });
        setIsDialogOpen(true);
    };

    const handleEmotionSelect = async (emotion: 'happy' | 'neutral' | 'sad') => {
        if (!auth.currentUser || !selectedDate) {
            alert('Please select a date and sign in to track your emotions');
            return;
        }

        const year = new Date().getFullYear();
        const dateKey = `${selectedDate.month}_${selectedDate.day}`;
        const docRef = doc(db, 'emotions', `${auth.currentUser.uid}_${year}`);

        try {
            await setDoc(docRef, {
                ...emotionData,
                [dateKey]: emotion
            }, { merge: true });

            setEmotionData(prev => ({
                ...prev,
                [dateKey]: emotion
            }));
        } catch (error) {
            console.error("Error saving emotion:", error);
        }

        setIsDialogOpen(false);
    };

    const getEmotionColor = (monthIndex: number, day: number) => {
        const dateKey = `${monthIndex}_${day}`;
        const emotion = emotionData[dateKey];
        return emotion ? emotions[emotion].color : 'rgba(255,255,255,0.1)';
    };

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
                                                onClick={() => handleDayClick(index, dayIndex + 1)}
                                                sx={{
                                                    width: '100%',
                                                    paddingTop: '100%',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    background: index === currentMonth && dayIndex + 1 === currentDay 
                                                        ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                                                        : getEmotionColor(index, dayIndex + 1),
                                                    borderRadius: 1,
                                                    border: index === currentMonth && dayIndex + 1 === currentDay 
                                                        ? '2px solid #fff'
                                                        : 'none',
                                                    '&:hover': {
                                                        opacity: 0.8,
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

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>How was your day?</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        {Object.entries(emotions).map(([emotion, { color, label }]) => (
                            <Grid item xs={4} key={emotion}>
                                <Button
                                    onClick={() => handleEmotionSelect(emotion as 'happy' | 'neutral' | 'sad')}
                                    sx={{
                                        width: '100%',
                                        height: '48px',
                                        backgroundColor: color,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: color,
                                            opacity: 0.8,
                                        },
                                    }}
                                >
                                    {label}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default Track;
