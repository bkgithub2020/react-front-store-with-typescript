import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { LoadingButton } from '@mui/lab';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './FormInput';

import {
    makeStyles,
    IconButton
} from "@material-ui/core";




const useStyles = makeStyles(() => ({
    addPersonBtn: {
        marginBottom: "20px"
    },
    modalCloseIcon: {
        position: "absolute",
        right: "9px",
        top: "12px",
        color: "rgb(158, 158, 158)"
    }
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;
    const { modalCloseIcon } = useStyles();

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    className={modalCloseIcon}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

const userSchema = object({
    firstName: string()
        .nonempty('First Name is required')
        .max(32, 'Name must be less than 100 characters'),
    email: string().nonempty('Email is required').email('Email is invalid'),
    lastName: string(),
    maidenName: string()
});

type UserInput = TypeOf<typeof userSchema>;

export default function UserForm({ callback, onClose, modalTitle, userData }: any) {
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = useState(false);
    const { addPersonBtn } = useStyles();
    console.log("userData", userData)

    const methods = useForm<UserInput>({
        resolver: zodResolver(userSchema),
    });

    const {
        reset,
        handleSubmit,
        register,
        formState: { isSubmitSuccessful, errors },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<UserInput> = async (values) => {

    };

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        {modalTitle} User
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <FormProvider {...methods}>
                            <Box
                                component='form'
                                noValidate
                                autoComplete='off'
                                onSubmit={handleSubmit(onSubmitHandler)}
                            >
                                <FormInput
                                    name='firstName'
                                    required
                                    fullWidth
                                    label='First Name'
                                    sx={{ mb: 2 }}
                                />

                                <FormInput
                                    name='lastName'
                                    required
                                    fullWidth
                                    label='Last Name'
                                    sx={{ mb: 2 }}
                                />

                                <FormInput
                                    name='maidenName'
                                    fullWidth
                                    label='Maiden Name'
                                    sx={{ mb: 2 }}
                                />

                                <FormInput
                                    name='email'
                                    required
                                    fullWidth
                                    label='Email Address'
                                    type='email'
                                    sx={{ mb: 2 }}
                                />
                                <div className="text-center">
                                    <LoadingButton
                                        variant='contained'
                                        type='submit'
                                        loading={loading}
                                        sx={{ mr: '5px' }}
                                    >
                                        Save
                                    </LoadingButton>
                                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                                </div>

                            </Box>
                        </FormProvider>
                    </DialogContent>
                </BootstrapDialog>
            </Dialog>
        </>
    );
}
