import { StyledButton } from "./Styles";
import TooltipComponent from "../tooltipComponent/Tooltip";
import IconDropdown from "../dropdown/IconDropdown";

interface CreateBtnProps {
    classname?: string,
    action: () => void,
    icon: string,
    AddBtnText?: string
    ToolTipText: string,
    Permission?: boolean,
    title?: string,
    options?: any[],
    disabledContent?: string,
    handleDropdownToggle?: any,
    openedDropdown?: any,
    IconDivClassname?: string
    disabled?: boolean
}

export const CreateBtn: React.FC<CreateBtnProps> = ({
    classname,
    action,
    icon,
    AddBtnText,
    ToolTipText,
    Permission = true,
    options,
    disabledContent = 'No Options',
    handleDropdownToggle,
    openedDropdown,
    IconDivClassname = "my-4 mx-2",
    disabled = false,
}: CreateBtnProps) => {
    return (
        Permission ? <TooltipComponent content={ToolTipText}>
            <div className={IconDivClassname}>
                {options ? (
                    <IconDropdown
                        title={ToolTipText}
                        options={options}
                        icon={icon}
                        disabledContent={disabledContent}
                        handleDropdownToggle={handleDropdownToggle}
                        openedDropdown={openedDropdown}
                        AddBtnText={AddBtnText}
                    />
                ) : (
                    <StyledButton
                        className={classname}
                        onClick={() => action()}
                        HasBtnText={!!AddBtnText}
                        disabled={disabled}
                    >
                        <div className='d-flex justify-content-center align-items-center'>
                            <i className={icon}></i>
                            {AddBtnText && <span>{AddBtnText}</span>}
                        </div>
                    </StyledButton>
                )
                }
            </div>
        </TooltipComponent > : null
    );
};