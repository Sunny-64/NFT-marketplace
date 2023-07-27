import { useState } from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Avatar } from "@material-tailwind/react";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));
const TabMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const data = [
        {
            label: "Trending",
            value: "trending",
            desc: ``,
        },
        {
            label: "Top",
            value: "top",
            desc: ``,
        },
    ];
    const button: any[] = [
        {
            label: "1h",
            value: "1h",
            desc: ``,
        },
        {
            label: "6h",
            value: "6h",
            desc: ``,
        },
        {
            label: "24h",
            value: "24h",
            desc: ``,
        },
        {
            label: "7d",
            value: "7d",
            desc: ``,
        },
    ]
    return (
        <div className='px-[32px] mt-8 '>
            <div className='mb-[24px] flex justify-between'>
                <Tabs id="custom-animation" value="trending" className="">
                    <TabsHeader className="!bg-[#1212120a]">
                        {data.map(({ label, value }) => (
                            <Tab key={value} value={value} className='text-[20px]  font-semiblod !font-[600]'>
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            initial: { y: 250 },
                            mount: { y: 0 },
                            unmount: { y: 250 },
                        }}
                    >
                        {data.map(({ value, desc }) => (
                            <TabPanel key={value} value={value}>
                                {desc}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
                <div className="flex gap-1  !item-centre right-0">
                    <Tabs id="custom-animation" value="1h" className=" !text-black">
                        <TabsHeader className="!bg-[#1212120a]">
                            {button.map(({ label, value }) => (
                                <Tab key={value} value={value} className='text-[20px]  !font-[600] '>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody
                            animate={{
                                initial: { y: 250 },
                                mount: { y: 0 },
                                unmount: { y: 250 },
                            }}
                        >
                            {button.map(({ value, desc }) => (
                                <TabPanel key={value} value={value}>
                                    {desc}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                    <div>
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                            className="!bg-[#1212120a] !text-black !py-[8px] !px-[18px] !font-[600]  !text-[16px]"
                        >
                            All Chain
                        </Button>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} disableRipple>
                                <EditIcon />
                                Edit
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple>
                                <FileCopyIcon />
                                Duplicate
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem onClick={handleClose} disableRipple>
                                <ArchiveIcon />
                                Archive
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple>
                                <MoreHorizIcon />
                                More
                            </MenuItem>
                        </StyledMenu>
                    </div>
                    <div>
                        <button className="!bg-[#1212120a] !text-black !py-[10px] !px-[24px] !font-[600]  !text-[16px] border-none rounded-md h-[]">
                            View all
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex ">
                <div className="w-[50%] mr-[5%]">
                    <div className="flex justify-between px-5 border-b border-[#E5E8EB] pb-[12px] text-[#646D75] mb-[8px]">
                        <div className="flex ">
                            <div className="flex me-5">
                                <span>Rank</span>
                            </div>
                            <div className="flex ">
                                <span>Collection</span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex me-5">
                                <span>Floor Price</span>
                            </div>
                            <div className="flex ">
                                <span>volume</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative  w-[100%] max-w-[100%] h-[480px] max-h-[480px] font-[600]">
                        <div className="flex justify-between w-[566px] list-none pl-[29px]  hover:bg-gray-100 rounded-md">
                            <div className="flex gap-10 items-center">
                                <li>1</li>
                                <li><img src="image13.avif" alt="" className="rounded-md w-20 inline-block mr-3" /><span>Genuine Undead</span></li>
                            </div>
                            <div className="flex gap-10 pl-12 items-center">
                                <li>0.12ETH</li>
                                <li>4.2ETH</li>
                            </div>
                        </div>
                        <div className="flex justify-between w-[566px] list-none pl-[29px] items-center my-4 hover:bg-gray-100 rounded-md">
                            <div className="flex gap-10 items-center">
                                <li>2</li>
                                <li><img src="image14.avif" alt="" className="rounded-md w-20 inline-block mr-3" /><span>The Bobo Council</span></li>
                            </div>
                            <div className="flex gap-10 pl-12 ">
                                <li>0.10ETH</li>
                                <li>2.2ETH</li>
                            </div>
                        </div>
                        <div className="flex justify-between w-[566px] list-none pl-[29px] items-center my-4 hover:bg-gray-100 rounded-md">
                            <div className="flex gap-10 items-center">
                                <li>3</li>
                                <li><img src="image15.avif" alt="" className="rounded-md w-20 inline-block mr-3" /><span>My Keyboard</span></li>
                            </div>
                            <div className="flex gap-10 pl-12 ">
                                <li>0.11ETH</li>
                                <li>3.2ETH</li>
                            </div>
                        </div>
                        <div className="flex justify-between  w-[566px] list-none pl-[29px] items-center my-4 hover:bg-gray-100 rounded-md">
                            <div className="flex gap-10 items-center">
                                <li>4</li>
                                <li><img src="image16.avif" alt="" className="rounded-md w-20 inline-block mr-3" /><span>RENGA</span></li>
                            </div>
                            <div className="flex gap-10 pl-12 ">
                                <li>0.12ETH</li>
                                <li>4.2ETH</li>
                            </div>
                        </div>
                        <div className="flex justify-between  w-[566px] list-none pl-[29px] items-center my-4 hover:bg-gray-100 rounded-md">
                            <div className="flex gap-10 items-center">
                                <li>5</li>
                                <li><img src="image13.avif" alt="" className="rounded-md w-20 inline-block mr-3" /><span>Rift Valley Motel Coin</span></li>
                            </div>
                            <div className="flex gap-10 pl-12 ">
                                <li>0.12ETH</li>
                                <li>4.2ETH</li>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[50%] ">
                    <div className="flex justify-between px-5  border-b border-[#E5E8EB] pb-[12px] text-[#646D75]  mb-[8px]">
                        <div className="flex">
                            <div className="flex me-5">
                                <span>Rank</span>
                            </div>
                            <div className="flex ">
                                <span>Collection</span>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex me-5">
                                <span>Floor Price</span>
                            </div>
                            <div className="flex ">
                                <span>volume</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative  w-[100%] max-w-[100%] h-[480px] max-h-[480px] font-[600]">
                        <div className="flex justify-between w-[566px] list-none pl-[29px]  hover:bg-gray-100 rounded-md">
                            <div className="flex gap-10 items-center">
                                <li>6</li>
                                <li><img src="image13.avif" alt="" className="rounded-md w-20 inline-block mr-3" /><span>Genuine Undead</span></li>
                            </div>
                            <div className="flex gap-10 pl-12 items-center">
                                <li>0.12ETH</li>
                                <li>4.2ETH</li>
                            </div>
                        </div>
                        <div className="flex justify-between w-[566px] list-none pl-[29px] items-center my-4 hover:bg-gray-100 rounded-md ">
                            <div className="flex gap-10 items-center">
                                <li>7</li>
                                <li><img src="image13.avif" alt="" className="rounded-md w-20 inline-block mr-3" /><span>The Bobo Council</span></li>
                            </div>
                            <div className="flex gap-10 pl-12 ">
                                <li>0.10ETH</li>
                                <li>2.2ETH</li>
                            </div>
                        </div>
                        <div className="flex justify-between w-[566px] list-none pl-[29px] items-center my-4 hover:bg-gray-100 rounded-md">
                            <div className="flex gap-10 items-center">
                                <li>8</li>
                                <li><img src="image13.avif" alt="" className="rounded-md w-20 inline-block mr-3" /><span>My Keyboard</span></li>
                            </div>
                            <div className="flex gap-10 pl-12 ">
                                <li>0.11ETH</li>
                                <li>3.2ETH</li>
                            </div>
                        </div>
                        <div className="flex justify-between  list-none pl-[29px] items-center my-4 hover:bg-gray-100 rounded-md">
                            <div className="flex gap-10 items-center">
                                <li>9</li>
                                <li><img src="image13.avif" alt="" className="rounded-md w-20 inline-block mr-3" /><span>RENGA</span></li>
                            </div>
                            <div className="flex gap-10 pl-12 ">
                                <li>0.12ETH</li>
                                <li>4.2ETH</li>
                            </div>
                        </div>
                        <div className="flex justify-between   list-none pl-[29px] items-center my-4 hover:bg-gray-100 rounded-md">
                            <div className="flex gap-10 items-center">
                                <li>10</li>
                                <li><img src="image13.avif" alt="" className="rounded-md w-20 inline-block mr-3" /><span>Rift Valley Motel Coin</span></li>
                            </div>
                            <div className="flex gap-10 pl-12 ">
                                <li>0.12ETH</li>
                                <li>4.2ETH</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default TabMenu