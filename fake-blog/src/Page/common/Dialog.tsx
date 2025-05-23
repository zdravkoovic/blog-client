import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import React, { useState } from "react"

type Props = {
    open: boolean;
    handleAgree: () => void;
    handleDisagree: () => void;
}

export default function DialogConfirm({open, handleAgree, handleDisagree }: Props) {

    const handleClose = () => {
        open=false;
    }

  return (
    <React.Fragment>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to post this blog?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                If you click the post button you will post the blog you already made          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}