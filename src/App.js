import React, { useState, useEffect, useCallback  } from 'react';
import { AppBar, Button, Box, CssBaseline, Typography, useMediaQuery, Divider, Grid2, TextField, Snackbar, Alert } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import emailjs from '@emailjs/browser';

// Profile picture glint animation
const glintAnimation = keyframes`
    0% {
        transform: translateX(-100%) translateY(-100%) rotate(-45deg);
        opacity: 0;
    }
    50% {
        opacity: 0.8;
    }
    100% {
        transform: translateX(100%) translateY(100%) rotate(-45deg);
        opacity: 0;
    }
`;

const GlintBorder = styled.div`
    width: 400px;
    height: 400px;
    border-radius: 50%;
    position: relative;
    background: black;
    padding: 4px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    /* Adjust the size for smaller screens */
    @media (max-width: 600px) {
        width: 300px;
        height: 300px;
    }
    @media (max-width: 350px) {
        width: 200px;
        height: 200px;
    }
    
    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.5) 25%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 0.5) 75%,
        transparent 100%
        );
        transform: rotate(-45deg);
        pointer-events: none;
        opacity: 0;
    }

    &.animate::before {
        animation: ${glintAnimation} 1.2s ease-in-out;
    }
`;

const CircularImage = styled.div`
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    z-index: 2;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

function App() {
    const highlightColour = '#3ad49b';
    const darkHighlightColour = '#32ad89';
    const isMobile = useMediaQuery('(max-width:600px)');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuHeight, setMenuHeight] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Set menu height based on scroll position and screen size
    useEffect(() => {
        setMenuHeight(scrolled || isMobile ? 70 : 100);
    }, [scrolled, isMobile]);

    // Detect when scroll occurs
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Toggle mobile menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Glint animation for profile picture
    const handleMouseEnter = useCallback(() => {
        if (!isAnimating) {
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 1200);
        }
    }, [isAnimating]);

    // Messaging
    const handleNameChange = (event) => {
        setName(event.target.value);
        setErrors({ ...errors, name: '' });
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrors({ ...errors, email: '' });
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        setErrors({ ...errors, message: '' });
    };

    const handleMessageSend = () => {
        let valid = true;
        const newErrors = { name: '', email: '', message: '' };
        
        if (name.replace(/\s+/g, '') === '') {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (email.replace(/\s+/g, '') === '') {
            newErrors.email = 'Email is required';
            valid = false;
        }

        if (message.replace(/\s+/g, '') === '') {
            newErrors.message = 'Message is required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            emailjs.send('service_hc5ojqi', 'template_a6peeej', {
                name: name,
                email: email,
                message: message
            }, 'qIsS2gIcT3Q4m8wZI')
                .then(() => {
                    setSnackbarMessage('Message sent successfully!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                }, () => {
                    setSnackbarMessage('An error occurred, please try again later.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
            );

            setName('');
            setEmail('');
            setMessage('');
        }
    };
    
    // List of projects
    const projects = [
        {name: 'Interview Helper', description: 'Simulates an online interview environment, transcribing answers to generate actionable feedback for improvement.', image: 'images/InterviewHelper.png', link: 'https://interview-helper-alpha.vercel.app/'}, 
        {name: 'Polymation', description: 'Polymation automates character skeleton and animation rigging using machine learning.', image: 'images/Polymation.png', link: 'https://github.com/Monash-FIT3170/Team7_AI_Modelling'}, 
        {name: 'MyJourney', description: 'MyJourney helps record your everyday journeys with images, location, weather, and more for easy diary keeping.', image: 'images/MyJourney.png', link: 'https://github.com/Jiawei-Liao/MyJourney'}, 
        {name: 'Klee\'s Bizarre Adventure', description: 'My first unity rogue-like game. Shoot slimes and upgrade yourself.', image: 'images/KleesBizarreAdventure.png', link: 'https://github.com/Jiawei-Liao/Klees-Bizarre-Adventure'},
        //{name: 'Betting Arbitrage Calculator', description: 'Find betting arbitrage trades.', image: 'image 4', link: 'https://github.com/Jiawei-Liao/Arbitrage'}, Haven't got a good image for this one
        {name: 'ChemQuest', description: 'ChemQuest is a story board game that helps students learn chemistry by using chemical reactions to complete the narrative.', image: 'images/ChemQuest.png', link: 'https://github.com/Jiawei-Liao/ChemQuest'},
        {name: 'Dehya Clicker', description: 'Let Dehya try to beat up a hydro slime.', image: 'images/DehyaClicker.png', link: 'https://jiawei-liao.github.io/Dehya-Clicker/'},
        {name: 'PZ Book Checklist', description: 'Keep track of the skill books you collect in Project Zomboid.', image: 'images/PZBookChecklist.png', link: 'https://jiawei-liao.github.io/PZ-Skill-Book-Checklist/'},
    ];

    return (
        <>
            <CssBaseline />
            {/* Snackbar for message sending */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {/* Navigation bar */}
            <AppBar position="fixed" sx={{  transition: '0.2s', height: menuHeight, backgroundColor: highlightColour, color: 'black' }}>
                <Box sx={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isMobile ? (
                        <>
                            {/* Mobile mavigation bar */}
                            <Box sx={{ display: 'flex', gap: 2, marginLeft: 2 }}>
                                <ScrollLink to="about" smooth={true} duration={500} offset={-100}>
                                    <Button color="inherit">
                                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                            Jiawei Liao
                                        </Typography>
                                    </Button>
                                </ScrollLink>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ marginRight: 2 }}>
                                <Button color="inherit" onClick={toggleMenu}>
                                    {menuOpen ? <MenuOpenIcon style={{ fontSize: 40 }} /> : <MenuIcon style={{ fontSize: 40 }} />}
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            {/* Desktop navigation bar */}
                            <Box sx={{ display: 'flex', gap: 2, marginLeft: {sm: 7, md: 20 } }}>
                                <ScrollLink to="about" smooth={true} duration={500} offset={-100}>
                                    <Button color="inherit">
                                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                            About Me
                                        </Typography>
                                    </Button>
                                </ScrollLink>
                                <ScrollLink to="projects" smooth={true} duration={500} offset={-70}>
                                    <Button color="inherit">
                                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                            Projects
                                        </Typography>
                                    </Button>
                                </ScrollLink>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ marginRight: {sm: 7, md: 20 } }}>
                                <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
                                    <Button color="inherit">
                                        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                            Contact Me
                                        </Typography>
                                    </Button>
                                </ScrollLink>
                            </Box>
                        </>
                    )}
                </Box>
            </AppBar>
            
            {/* Mobile menu */}
            {isMobile && (
                <Box sx={{ position: 'fixed', top: menuHeight, left: 0, right: 0, backgroundColor: highlightColour, color: 'black', zIndex: 1300, overflow: 'hidden', maxHeight: menuOpen ? '160px' : '0', transition: 'max-height 0.3s ease-in-out', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingX: 10, opacity: menuOpen ? 1 : 0, transform: `translateY(${menuOpen ? '0' : '-20px'})`, transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out' }}>
                        <ScrollLink to="about" smooth={true} duration={500} offset={-100}>
                            <Button color="inherit" fullWidth sx={{ textAlign: 'center' }} onClick={toggleMenu}>
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                                    About Me
                                </Typography>
                            </Button>
                        </ScrollLink>
                        <Divider />
                        <ScrollLink to="projects" smooth={true} duration={500} offset={-70} onClick={toggleMenu}>
                            <Button color="inherit" fullWidth sx={{ textAlign: 'center' }}>
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                                    Projects
                                </Typography>
                            </Button>
                        </ScrollLink>
                        <Divider />
                        <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
                            <Button to="contact" color="inherit" fullWidth sx={{ textAlign: 'center' }} onClick={toggleMenu}>
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                                    Contact Me
                                </Typography>
                            </Button>
                        </ScrollLink>
                    </Box>
                </Box>
            )}
    
            {/* Main content */}
            <Box sx={{ mt: `${menuHeight}px` }}>
                {/* About me section */}
                <Box id="about" sx={{ backgroundColor: 'white', padding: 3 }}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <GlintBorder className={isAnimating ? 'animate' : ''} onMouseEnter={handleMouseEnter}>
                            <CircularImage>
                                <img src="images/Jiawei.png" alt="Jiawei Liao" />
                            </CircularImage>
                        </GlintBorder>
                        <Box sx={{ paddingX: { xs: 3, sm: 5}, paddingBottom: 5 }}>
                            <Typography variant='h5' sx={{ fontWeight: 'bold', paddingTop: 3 }}>
                                Hey, I'm <span style={{ color: darkHighlightColour }}>Jiawei Liao</span>, studying Software Engineering at Monash University.
                            </Typography>
                            <Typography variant='h5' sx={{ fontWeight: 'bold', paddingTop: 2 }}>
                                Intern at Tasty Fresh, building a <span style={{ color: darkHighlightColour }}>machine learning</span> POS system for micro-markets.
                            </Typography>
                            <Typography variant='h5' sx={{ fontWeight: 'bold', paddingTop: 2 }}>
                                I love <span style={{ color: darkHighlightColour }}>exploring</span> new technologies and applying them in projects like the ones below!
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                {/* Projects section */}
                <Box id="projects" sx={{ backgroundColor: 'black', padding: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingX: { xs: 3, sm: 5 }, paddingBottom: 5 }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', padding: 5, color: 'white' }}>
                            Projects
                        </Typography>
                        <Box sx={{ width: '100%', paddingX: { sm: 0, md: 5, lg: 10, xl: 25} }}>
                            <Grid2 container spacing={2}>
                                {projects.map((project, index) => (
                                    <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Box onClick={() => window.open(`${project.link}`, '_blank')} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', 
                                        justifyContent: 'space-between', height: 350, width: '100%', backgroundColor: highlightColour, borderRadius: '5px', border: '1px solid transparent', 
                                        transition: 'transform 0.3s ease-in-out, border-color 0.3s ease-in-out', overflow: 'hidden', '&:hover': { transform: 'translateY(-5px)'}}}>
                                            <Box sx={{ height: '50%', width: '100%', backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center', }}/>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '50%', padding: 3 }}>
                                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                                    {project.name}
                                                </Typography>
                                                <Typography variant="body1"sx={{ mb: 2 }}>
                                                    {project.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid2>
                                ))}
                            </Grid2>
                        </Box>
                    </Box>
                </Box>
                {/* Contact me section */}
                <Box id="contact" sx={{ backgroundColor: 'white', padding: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingX: { xs: 3, sm: 5 }, paddingBottom: 5 }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', padding: 5 }}>
                            Contact Me
                        </Typography>
                        <Box sx={{ width: '100%', paddingX: { sm: 0, md: 5, lg: 20, xl: 40} }}>
                            <Grid2 container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid2 size={{ xs: 12, sm: 3 }}>
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', gap: 5 }}>
                                        <Button onClick={() => window.open('https://www.linkedin.com/in/jiawei-liao-54a9a6300/', '_blank')}>
                                            <LinkedInIcon sx={{ height: 80, width: 80, color: '#0077B5' }} />
                                        </Button>
                                        <Button onClick={() => window.open('https://github.com/Jiawei-Liao', '_blank')}>
                                            <GitHubIcon sx={{ height: 70, width: 70, color: '#333' }} />
                                        </Button>
                                    </Box>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 9 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', gap: 2 }}>
                                        <TextField type="text" placeholder="Name" fullWidth value={name} onChange={handleNameChange} error={!!errors.name} helperText={errors.name} sx={{ marginBottom: 1 }}/>
                                        <TextField type="email" placeholder="Email" fullWidth value={email} onChange={handleEmailChange} error={!!errors.email} helperText={errors.email} sx={{ marginBottom: 1 }}/>
                                        <TextField placeholder="Message" multiline rows={5} fullWidth value={message} onChange={handleMessageChange} error={!!errors.message} helperText={errors.message} sx={{ marginBottom: 1 }}/>
                                        <Button variant="contained" sx={{ backgroundColor: darkHighlightColour }} onClick={handleMessageSend}>
                                            Send Message
                                            <Box sx={{ transform: 'rotate(-45deg)', marginLeft: 2}}>
                                                <SendIcon />
                                            </Box>
                                        </Button>
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default App;