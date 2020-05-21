import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import RewardsButton from '../../components/rewards.button';

const useStyles = makeStyles((theme) => ({
    searchgroup: {
        height: 75,
        borderRadius: 3,
        margin: theme.spacing(1),
    },
    searchtext: {
        borderRadius: 3,
        height: 40,
        padding: '0 30px',
        fontSize: 'larger',
        marginRight: theme.spacing(1),
    },
    searchbutton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        fontSize: 'larger',
        marginTop: theme.spacing(2),
    },
}));

const SearchBar = ({ handleSearch }) => {
    const classes = useStyles();
    const [search, setSeach] = React.useState('');
    const searchButtonRef = React.useRef(null);

    const handleChange = (e) => {
        setSeach(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (searchButtonRef && searchButtonRef.current) {
                searchButtonRef.current.click();
            }
        }
    };

    const invokeSearch = async () => {
        let searchTerm = search ? search.trim() : '';
        if (searchTerm !== '') {
            await handleSearch(searchTerm);
        }
    };

    return (
        <Paper elevation={2} className={classes.searchgroup}>
            <div style={{ paddingTop: '13px' }}>
                <input
                    type="text"
                    name="txtsearch"
                    placeholder="enter ingredient to search"
                    className={classes.searchtext}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <RewardsButton
                    ref={searchButtonRef}
                    type="search"
                    left="-500px"
                    top="-55px"
                    style={{ float: 'right' }}
                    onClickHandler={invokeSearch}
                />
            </div>
        </Paper>
    );
};

export default SearchBar;
