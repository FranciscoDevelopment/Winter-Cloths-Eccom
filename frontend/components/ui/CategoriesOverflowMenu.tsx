"use client"

import { useState, MouseEvent } from "react"
import Link from "next/link"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { categoryT } from "@/src/schema"

type categoriesOverflowMenuPropsT = {
    categories : categoryT[]
}

export default function CategoriesOverflowMenu ( {categories} : categoriesOverflowMenuPropsT ) {

    const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null)

    const isOpen = Boolean(anchorEl)

    const handleOpen = ( event : MouseEvent<HTMLElement> ) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    return (
        <>
            <IconButton
                onClick={handleOpen}
                aria-label="More categories"
                aria-controls={isOpen ? "categories-overflow-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? "true" : undefined}
                sx={{
                    color: "white"
                }}
            >
                <KeyboardArrowDownIcon
                    sx={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s"
                    }}
                />
            </IconButton>

            <Menu
                id="categories-overflow-menu"
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                {categories.map( (category) => (
                    <MenuItem key={category.id} onClick={handleClose} component={Link} href={`/${category.id}`}>
                        {category.name}
                    </MenuItem>
                ) )}
            </Menu>
        </>
    )

}
