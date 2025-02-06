import { BrowserRouter as Router, Routes, Route,useNavigate } 
    from "react-router-dom";

import React,{useRef,useState} from 'react';
import {Grid,CardHeader,Paper,Typography,CardMedia,CardProps,Card,styled,CardContent,Button, Container, Box} from '@mui/material';
import ElevateAppBar from './header'
import { motion } from 'framer-motion';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Helmet } from 'react-helmet';

function App(){
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    return(
    <>
    <Helmet>
        <title>LookBack</title>
    </Helmet>
    <div> 

    {/* <ElevateAppBar> */}
    
    <div>
        <Container maxWidth="lg">
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                }}
            >
                <Typography
                    variant="h2"
                    component={motion.h2}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    sx={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        mb: 4,
                    }}
                >
                    Welcome to LookBack!
                </Typography>

                <Card
                    component={motion.div}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    sx={{
                        maxWidth: 800,
                        background: 'linear-gradient(45deg, #343a40 30%, #495057 90%)',
                        borderRadius: 4,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <EmojiEmotionsIcon sx={{ color: '#fff', fontSize: 40 }} />
                            <Typography variant="h5" sx={{ color: 'white', alignItems: 'center' }}>
                                Track Your Daily Emotions
                            </Typography>
                        </Box>
                        
                        <Typography variant="body1" sx={{ color: 'white', mb: 3 }}>
                            Record how you feel each day - happy, sad, or neutral. 
                            Discover patterns in your emotional journey and gain insights about yourself.
                        </Typography>

                        <Button
                            component={motion.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/track')}
                            sx={{
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                color: 'white',
                                padding: '12px 32px',
                                borderRadius: '25px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                                }
                            }}
                        >
                            Get Started
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    </div>
    {/* </ElevateAppBar> */}
    </div>
    </>
    )
    
}

export default App;