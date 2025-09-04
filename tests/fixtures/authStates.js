export const initialStete = {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    user: {},
    errorMessage: undefined,
}


export const authenticatedState = {
    status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
    user: {
        uid:'ABC',
        name: 'Alejandro'
    },
    errorMessage: undefined,
}

export const notauthenticatedState = {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    user: { },
    errorMessage: undefined,
}