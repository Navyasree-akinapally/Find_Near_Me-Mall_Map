import React, { useState, useEffect } from 'react'
import Select, { components } from "react-select";
import { LayoutThreeColumns } from "react-bootstrap-icons"
import CloseButton from "react-bootstrap/CloseButton"
import styled from 'styled-components';
import ReusableButton, { Variant } from '../buttons/Button';
import { StyledButton } from './Styles';
import TooltipComponent from '../tooltipComponent/Tooltip';
const StyledThreeColumns = styled(LayoutThreeColumns)`
transition:hover,0.25s ease-in-out;
border-radius:3.7px;
color:lightgray;
background:gray;
&:hover{
    background-color:#0275d8;
    color:lightgray;
}
`;

const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <div className='ms-5 d-flex text-black-50 fw-bolder'>
                    <input
                        type="checkbox"
                        checked={!props.isSelected}
                        onChange={() => null}
                        className='me-3'
                    />
                    <label>{props.label}</label>
                </div>
            </components.Option>
        </div>
    );
};



function CheckboxDropDown({ options, value, setValue }) {
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest('.checkbox-dropdown-container')) {
            setMenuIsOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex: 9999, // Increase the z-index value as per your requirement
        }),
    };

    const CustomMenu = (props) => (
        <components.Menu {...props}>
            <div className='m-5 mb-0'>
                <div className='d-flex position-relative fw-bolder text-black-50'>
                    <p>Show Columns</p>
                    <div className='position-absolute end-0 cursor-pointer' onClick={() => setMenuIsOpen(false)}>
                        <CloseButton />
                    </div>
                </div>
            </div>
            {props.children}
        </components.Menu>
    );

    return (
        <>
            <Select
                defaultValue={[]}
                isMulti
                // styles={customStyles}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                isSearchable={false}
                controlShouldRenderValue={false}
                onChange={setValue}
                options={options}
                components={{
                    Option,
                    Control: () => (<TooltipComponent content="Column" >
                        <StyledButton className={`btn btn-sm btn-icon ${menuIsOpen? 'btn-primary' : ''}`} onClick={() => setMenuIsOpen(prev => !prev)}>
                            <i className='bi bi-columns'></i>
                            {/* <ReusableButton
                            key={"index"}
                            size='sm'
                            variant={"primary"}
                            onClick={() => setMenuIsOpen(prev => !prev)}
                        >
                            {"label"}
                        </ReusableButton> */}
                        </StyledButton>
                        </TooltipComponent>  ),
                    Menu: CustomMenu
                }}
                value={value}
                menuIsOpen={menuIsOpen}
                menuPlacement="auto"
                styles={{
                    menu: provided => ({
                        ...provided,
                        width: "200px",
                        position: "absolute",
                        right: 0,
                        zIndex: 9999,

                    })
                }}

            />
        </>
    )
}

export default CheckboxDropDown