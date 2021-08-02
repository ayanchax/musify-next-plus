import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import parse from "html-react-parser";
import { useDataLayerContextValue } from "../configurations/DataLayer";

import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinIcon,
    LinkedinShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
} from "react-share";
import Footer from "./Footer";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ShareDialog = ({
    url,
    networks,
    title,
    contentTitle,
    content,
    isOpen,
    updateModalState,
    songThumbnail,
    metaCurrentUrl,
    metaTitle,
    metaDescription,
    metaImage,
    uniqueToken,
}) => {
    const [{ pause, play }, dispatch_v2] = useDataLayerContextValue();
    
    useEffect(() => {
        if (metaCurrentUrl && metaTitle && metaDescription && metaImage) {
            if (
                url == undefined ||
                contentTitle == undefined ||
                content?.image == undefined ||
                content?.subtitle == undefined
            ) {
                return;
            }

            if (!play) {
                if (isOpen) {
                    metaCurrentUrl(url);
                    metaTitle(contentTitle);
                    metaImage(content?.image);
                    metaDescription(content?.subtitle);
                }
            }
            else {
                if (isOpen) {
                    metaCurrentUrl(url);
                    metaImage(content?.image);
                    metaDescription(content?.subtitle);
                }
            }

        }
    }, [url, title, uniqueToken]);

    if (isOpen) {
        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth="sm"
                    open={isOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={updateModalState}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <div className="flex text-justify">
                            <div className="text-2xl">
                                <ShareIcon /> {title}
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <div className=" text-white justify-center text-center flex-column">
                                <div className="flex justify-center">
                                    <img
                                        className="object-contain md:w-72 md:h-72 w-52 h-52 lg:w-96 lg:h-96"
                                        src={content?.image}
                                        alt="SongContentImage"
                                    />
                                </div>
                                <div className="px-2 py-2 font-semibold font-sans">
                                    {parse(contentTitle)}
                                </div>
                                <div className="text-gray-400 text-sm font-sans">
                                    {content?.more_info?.primary_artists_label
                                        ? content?.more_info?.primary_artists_label
                                        : content?.subtitle}{" "}
                                    | {parse(content?.more_info?.album)} | {content?.year}
                                </div>
                            </div>

                            <div className="dialog__share__container">
                                {networks.map((network) => (
                                    <div key={network}>
                                        {network === "facebook" && (
                                            <FacebookShareButton
                                                url={url}
                                                quote={contentTitle}
                                                hashtag="#musify"
                                                className="dialog__some-network__share-button"
                                            >
                                                <FacebookIcon size={32} round />
                                            </FacebookShareButton>
                                        )}
                                        {network === "messenger" && (
                                            <FacebookMessengerShareButton
                                                url={url}
                                                hashtag="#musify"
                                                quote={contentTitle}
                                                className="dialog__some-network__share-button"
                                            >
                                                <FacebookMessengerIcon size={32} round />
                                            </FacebookMessengerShareButton>
                                        )}

                                        {network === "whatsapp" && (
                                            <WhatsappShareButton
                                                url={url}
                                                hashtag="#musify"
                                                quote={contentTitle}
                                                className="dialog__some-network__share-button"
                                            >
                                                <WhatsappIcon size={32} round />
                                            </WhatsappShareButton>
                                        )}
                                        {network === "twitter" && (
                                            <TwitterShareButton
                                                url={url}
                                                hashtag="#musify"
                                                quote={contentTitle}
                                                className="dialog__some-network__share-button"
                                            >
                                                <TwitterIcon size={32} round />
                                            </TwitterShareButton>
                                        )}

                                        {network === "linkedin" && (
                                            <LinkedinShareButton
                                                url={url}
                                                hashtag="#musify"
                                                quote={contentTitle}
                                                className="dialog__some-network__share-button"
                                            >
                                                <LinkedinIcon size={32} round />
                                            </LinkedinShareButton>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions></DialogActions>
                    <Footer />
                    <div className="flex justify-center text-xs text-gray-400">
                        <Button className="" onClick={updateModalState} color="white">
                            Close
                        </Button>
                    </div>
                </Dialog>
            </div>
        );
    }

    return null;
};

export default ShareDialog;
