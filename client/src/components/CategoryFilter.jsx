import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getProductFilters, addCategoryFilter } from "../redux/filter/slice.js";
import { getProductByFilter } from "../redux/product/slice.js";

const useViewStyles = makeStyles({
    root: {
        "& > .MuiTreeView-root": {
            height: "100px",
            flexGrow: 1,
            overflow: "auto",
        },
    },
});

const useItemStyles = makeStyles(() => ({
    root: {
        "& > .MuiTreeItem-content > .MuiTreeItem-label": {
            display: "flex",
            alignItems: "center",
            padding: "4px 0",
            background: "transparent !important",
            pointerEvents: "none",
        },
        "& > .MuiTreeItem-content  > .MuiTreeItem-label::before": {
            content: "''",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 8,
            border: "1px solid #ccc",
            background: "white",
        },
        "& > .Mui-selected  > .MuiTreeItem-label::before": {
            content: "''",
            display: "inline-block",
            width: 12,
            height: 12,
            marginRight: 8,
            border: "1px solid #ccc",
            background: "#d81b60",
        },
    },
    iconContainer: {
        marginRight: 12,
        "& > svg": {
            padding: 8,
            "&:hover": {
                opacity: 0.6,
            },
        },
    },
    label: {
        padding: 0,
    },
    selected: {
        "& > .MuiTreeItem-content  > .MuiTreeItem-label::before": {
            backgroundColor: "#d81b60",
            border: "1px solid transparent",
        },
    },
}));

export default function CategoryFilter({ category }) {
    const classesView = useViewStyles();
    const classesItem = useItemStyles();
    const dispatch = useDispatch();
    const renderTree = (nodes) => (
        <TreeItem
            classes={classesItem}
            key={nodes.id}
            nodeId={nodes.id}
            label={nodes.name}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const productFilters = useSelector((state) => state.filter.productFilters);

    React.useEffect(() => {
        console.log("in use effect category initial; ", category);
        dispatch(getProductFilters(category));
    }, []);

    React.useEffect(() => {
        console.log("in use effect category expanded; ", expanded);
    }, [expanded]);

    React.useEffect(() => {
        console.log("in use effect category selected; ", selected);
        dispatch(addCategoryFilter(selected[0]));
        dispatch(getProductByFilter());
    }, [selected]);

    const handleToggle = (event, nodeIds) => {
        // if (event.target.nodeName !== "svg") {
        //     return;
        // }
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        console.log("selected node id is: ", nodeIds);
        setSelected([nodeIds]);
        // if (event.target.nodeName === "svg") {
        //     return;
        // }
        // const first = nodeIds[0];
        // if (selected.includes(first)) {
        //     setSelected(selected.filter((id) => id !== first));
        // } else {
        //     setSelected([first, ...selected]);
        // }
    };
    if (!productFilters) {
        return null;
    }
    return (
        <div>
            <Typography
                component="legend"
                sx={{
                    mb: 1.5,
                }}
            >
                By Category
            </Typography>
            <TreeView
                classes={classesView}
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                // selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                {productFilters && renderTree(productFilters)}
            </TreeView>
        </div>
    );
}
