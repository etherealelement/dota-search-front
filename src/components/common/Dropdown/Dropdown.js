import {Component, ReactNode, useState} from "react";
import styled from "styled-components";

const Root = styled.div``;
const Control = styled.button`
  width: 100%;
  margin: 0;
  padding: 0;
`;
const Menu = styled.menu`
  margin: 1px 0 0;
  padding: 0;
  border: 1px solid #bebebe;
  max-height: 100px;
  overflow-y: auto;
`;

export default class Dropdown extends Component{
    render() {
        const [isOpen, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const { children } = this.props;
        return(
            <Root>
                <Control>{children}</Control>
                {
                    isOpen && (
                        <Menu/>
                    )
                }
            </Root>
        );
    }
};