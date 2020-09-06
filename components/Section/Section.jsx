import {
    makeStyles,
    Accordion,
    AccordionSummary,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "50%",
        margin: "0 auto 10px auto",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0,
    },
    detailsRight: {
        textAlign: "right",
        width: "100%",
    },
}));

const Section = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion expanded={props.expanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${props.title}-panel-content`}
                    id={`${props.title}-panel-header`}
                    onClick={props.clickHandler}
                >
                    <Typography className={classes.heading}>
                        {props.title}
                    </Typography>
                </AccordionSummary>
                <div
                    style={{
                        backgroundColor: "#555",
                    }}
                >
                    {props.data}
                </div>
            </Accordion>
        </div>
    );
};

Section.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    expanded: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired,
};

export default Section;
