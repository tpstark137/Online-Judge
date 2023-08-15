import React from 'react'
import { useNavigate } from "react-router-dom";
import './style.css'
import { styled } from '@mui/material/styles';
import { Typography} from '@mui/material';

function Home() {
    const nav = useNavigate()
    const TextWrapper = styled(Typography)({
        marginTop: '2rem',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bolder',
        fontSize: '2.8rem',
    });

    const CompaniesWrapper = styled('div')(({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '2rem 1rem',
        img: {
            [theme.breakpoints.up('md')]: {
                width: '17vmin',
            },
            [theme.breakpoints.down('md')]: {
                width: '14vmin',
            },
        },
    }));

    return (
        <>
            <div className="jumbotron text-center mt-5  text-white">
                <h1><span className='logo'>Coding</span>Panda.io</h1>
                <p className='mt-5'>~ An Online Judge built with MERN Stack</p>
                <br />
                <img src="https://media.tenor.com/y2JXkY1pXkwAAAAC/cat-computer.gif" alt=".gif" />
                <br />
                <p className='mt-3'>Have fun and improve your skills
                    <br />
                    Beat the challenge faster than your opponent using your ❤ language</p>
                <button onClick={() => nav('/problemList')} className='btn btn-danger mb-5'>Go To Problems List</button>

                <TextWrapper variant="h2">Get <span className='logo'>{`</>`}</span>Problems From</TextWrapper>
                <CompaniesWrapper>
                    <img src="/company/Google.svg" alt='google_logo' />
                    <img src="/company/Microsoft.svg" alt='microsoft_logo' />
                    <img src="/company/Amazon.svg" alt='amazon_logo'/>
                    <img src="/company/Flipkart.svg" alt='flipkat_logo' />
                    <img src="/company/Intuit.svg" alt='intuit_logo' />
                </CompaniesWrapper>
            </div>
        </>
    )
}
export default Home;