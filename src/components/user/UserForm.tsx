import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { LoadingButton } from '@mui/lab';
import { literal, object, string, TypeOf } from 'zod';
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
    email: string().nonempty('Email is required').email('Email is invalid')
});

type UserInput = TypeOf<typeof userSchema>;

export default function UserForm({ callback }: any) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const { addPersonBtn } = useStyles();

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
        await axios.post('/users/add', values)
            .then(function (response) {
                setOpen(false);//Close popup
                callback(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="secondary"
                startIcon={<PersonAddIcon />}
                className={addPersonBtn}
                onClick={handleClickOpen}
            >
                New User
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Modal title
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        {/* <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '95%', maxWidth: '95%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    label="First Name"
                                    helperText={errors.firstName?.message}
                                    {...register("firstName", { required: "First name is required" })}
                                    error={errors.firstName ? true : false}
                                    onChange={handleChange}
                                    value={formStatee.values.firstName}
                                />
                                <TextField
                                    label="Last Name"
                                    helperText={errors.lastName && "Last name is required"}
                                    {...register("lastName", { required: true })}
                                    error={errors.lastName ? true : false}
                                    onChange={handleChange}
                                    value={formStatee.values.lastName}
                                />
                                <TextField
                                    label="Maiden Name"
                                    {...register("maidenName")}
                                    onChange={handleChange}
                                    value={formStatee.values.maidenName}
                                />
                                <TextField
                                    label="Email"
                                    helperText={errors.email && "Email is required"}
                                    {...register("email", { required: true })}
                                    error={errors.email ? true : false}
                                    onChange={handleChange}
                                    value={formStatee.values.email}
                                />

                            </div>
                        </Box> */}

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
        </div>
    );
}
