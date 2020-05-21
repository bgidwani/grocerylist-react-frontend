import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ReactGA from 'react-ga';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '12px',
    },
    recipecard: {
        maxWidth: 345,
    },
    avatar: {
        backgroundColor: red[500],
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    mainDetailsContent: {
        textAlign: 'left',
        letterSpacing: 1.5,
        '& > div': {
            fontWeight: 'bold',
            '& > span': {
                paddingLeft: '5px',
                fontWeight: 'normal',
            },
        },
    },
    itemSpacer: {
        width: '2%',
        float: 'left',
    },
    nutritionalSummary: {
        width: '100%',
    },
    nutritionalHeading: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: theme.typography.fontWeightBold,
    },
    ingredientDetails: {
        textAlign: 'left',
    },
    ingredientHeading: {
        textTransform: 'uppercase',
        paddingLeft: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
    },
    ingredientItems: {
        textTransform: 'none',
        margin: theme.spacing(2),
    },
    ingredientSource: {
        paddingTop: theme.spacing(1),
        margin: theme.spacing(1),
    },
}));

const RecipeCard = ({ recipe }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const Servings = () => (
        <span style={{ position: 'relative' }}>
            <RestaurantMenuIcon
                style={{ position: 'relative', float: 'left' }}
                fontSize="small"
                color="primary"
            />
            <Typography
                style={{
                    paddingLeft: '5px',
                    position: 'relative',
                    float: 'left',
                }}
                variant="subtitle2"
            >
                <strong>Servings:</strong>&nbsp;{recipe.yield}
            </Typography>
        </span>
    );

    const MainDetails = () => {
        const TotalTime = () =>
            recipe.totalTime && recipe.totalTime > 0 ? (
                <div>
                    Cook Time:
                    <span>{recipe.totalTime} minutes</span>
                </div>
            ) : null;

        const CaloriesPerServing = () =>
            recipe.caloriesPerServing && (
                <div>
                    Calories (per serving):
                    <span>
                        {recipe.caloriesPerServing.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                        })}
                        &nbsp;kcal
                    </span>
                </div>
            );

        const TotalWeight = () =>
            recipe.totalWeight && (
                <div>
                    Total Weight:
                    <span>
                        {recipe.totalWeight.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                        })}
                        &nbsp;g
                    </span>
                </div>
            );

        return (
            <Typography variant="body2" color="textSecondary" component="p">
                <div className={classes.mainDetailsContent}>
                    <TotalTime />
                    <CaloriesPerServing />
                    <TotalWeight />
                </div>
            </Typography>
        );
    };

    return (
        <div className={classes.root}>
            <Card className={classes.recipecard}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <Typography
                            style={{ letterSpacing: 1.25 }}
                            align="left"
                            variant="h6"
                        >
                            {recipe.label}
                        </Typography>
                    }
                    subheader={<Servings />}
                />
                <CardMedia
                    className={classes.media}
                    image={recipe.image}
                    title={recipe.label}
                />
                <CardContent>
                    <MainDetails />
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.ingredientDetails}>
                        <Typography
                            variant="overline"
                            className={classes.ingredientHeading}
                            paragraph
                        >
                            Ingredients
                        </Typography>
                        {recipe.ingredientLines.map((ingredient) => (
                            <Typography
                                paragraph
                                color="textSecondary"
                                className={classes.ingredientItems}
                            >
                                {ingredient}
                            </Typography>
                        ))}
                        <Divider light />
                        <div className={classes.nutritionalSummary}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography
                                        variant="overline"
                                        className={classes.nutritionalHeading}
                                    >
                                        Nutrition Profile:
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography variant="subtitle2">
                                        {recipe.healthLabels.map(
                                            (healthLabel) => (
                                                <Chip
                                                    key={healthLabel}
                                                    label={healthLabel}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            )
                                        )}
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                        <Divider light />
                        <Typography
                            paragraph
                            color="textSecondary"
                            className={classes.ingredientSource}
                        >
                            <b>Details:</b>{' '}
                            <ReactGA.OutboundLink
                                eventLabel={`${recipe.source} - ${recipe.url}`}
                                to={recipe.url}
                                target="_blank"
                            >
                                {recipe.source}
                            </ReactGA.OutboundLink>
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
};

export default RecipeCard;
