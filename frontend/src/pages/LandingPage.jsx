import { Container, Typography, Grid2, Card, CardActionArea, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import theme from "../theme"; // Importing the theme for styling

function HomePage() {
    return (
        <Container sx = {{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant = 'h1' fontWeight = '650' sx = {{ color: theme.palette.text.primary }}>SecuLearn</Typography>
            <Grid2 container spacing = {4} justifyContent = {'center'} mt = {5} mb = {10} sx = {{ color: theme.palette.text.primary }}>
                {[
                    { label: "Register", path: "/register" },
                    { label: "Login", path: "/login" },
                ]. map((item) => (
                    <Grid2 item md = {3} key = {item.label}>
                        <Card>
                            <CardActionArea component = {Link} to = {item.path} sx = {{ padding: 4 }}>
                                <Typography variant = 'h4' fontWeight = {600} sx = {{ color: theme.palette.text.primary }}>{item.label}</Typography>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <Box component = "footer" style = {{ py: 3 }}>
                    <Typography variant = 'body1' sx = {{ color: theme.palette.text.primary }}>This application has been developed by Oliver Prevett, for the COMP3000 project.</Typography>
            </Box>
        </Container>
    );
}

export default HomePage;