'use client'
import Layout from './layout'
import React, {Suspense, useEffect} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import styled from '@emotion/styled'



const Img = styled.img`
    margin: auto;
    display: block;
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    `
const Item = styled(Grid)`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    `
export default function Page(){

    // const dispatch = useDispatch();
    // const user = useSelector((state: any) => state.auth.user);
    //
    // const handleLogin = () => {
    //     dispatch(loginRequest({username: 'admin', password: 'admin'}));
    // }

    return (
        <Layout>
                <Grid container height='100vh'>
                    {/*Grid Form in right-side full height*/}
                    <Grid container sm={4} order={{xs: 1, sm: 2}}>
                        <Paper elevation={3}>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
                                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>FJ</Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" sx={{mt: 1}}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus

                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary"/>}
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        size={"large"}
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Item>
                                        <Item>
                                            <Link href="#" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Item>
                                    </Grid>
                                </Box>
                            </Box>
                        </Paper>

                    </Grid>
                    {/*Grid Image in left-side*/}
                    <Grid container sm={8} order={{xs: 2, sm: 1}}>
                        <Img src="/dist/images/Project_158-03.jpg" alt="random" loading='lazy'/>
                    </Grid>
                </Grid>
        </Layout>
    );
}