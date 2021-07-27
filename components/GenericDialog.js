import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from "react";
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

import Footer from './Footer';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GenericDialog = ({ dialogIcon, header, bodyComponent, footer, additionalData, isOpen, updateModalState, onComponentClosed }) => {
    const closeComponents = () => {
        updateModalState()
        onComponentClosed()
    }
    if (isOpen) {
        return (
            <div>

                <Dialog
                    fullWidth={true}
                    maxWidth="sm"
                    open={isOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={closeComponents}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">

                        <div className="flex text-justify">
                            <div className="text-2xl">
                                {dialogIcon !== undefined ? dialogIcon : ""} {header}
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <div className="genericdialog__share__container">
                                {bodyComponent !== undefined ? bodyComponent : ""}

                            </div>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>


                    </DialogActions>
                    <Footer footer={footer} />


                    <div className="flex justify-center text-xs text-gray-400">
                        <Button className="" onClick={updateModalState} color="white">
                            Close
                        </Button>
                    </div>
                </Dialog>
            </div>
        )

    }

    return null;
};




export default GenericDialog
