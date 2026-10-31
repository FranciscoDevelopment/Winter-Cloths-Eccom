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
                title="View more categories"
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
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: "#374151", // tailwind bg-gray-700, igual que el navbar
                            fontFamily: "inherit", // hereda la tipografia global (Outfit) en vez del Roboto default de MUI
                            border: "2px solid white"
                        }
                    }
                }}
            >
                {categories.map( (category) => (
                    <MenuItem
                        key={category.id}
                        onClick={handleClose}
                        component={Link}
                        href={`/${category.id}`}
                        sx={{
                            color: "#F1F5F9", // tailwind text-slate-100
                            fontWeight: 700, // tailwind font-bold
                            fontFamily: "inherit",
                            "&:hover": { color: "#4ADE80", backgroundColor: "transparent" } // tailwind hover:text-green-400
                        }}
                    >
                        {category.name}
                    </MenuItem>
                ) )}
            </Menu>
        </>
    )

}
