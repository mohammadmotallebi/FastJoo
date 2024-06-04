import React, {useEffect} from 'react';
import {
    Page, f7
} from 'framework7-react';
import {getDevice, Dom7} from 'framework7';



const $$ = Dom7;
const HomePage = ({f7router}) => {
    const notificationWithButton = React.useRef(null);

    // const deviceWidth = f7.width;
    // const panelOpen = useStore('panelOpen');
    //
    // useEffect(() => {
    //     console.log('current user', currentUser)
    //     if (!currentUser.value) {
    //         f7router.navigate('/login/');
    //     }
    // }, [currentUser]);
    const showNotificationWithButton = ({
                                            title = '',
                                            subtitle = '',
                                            text = '',
                                            closeTimeout = 3000,
                                            icon = '',
                                            closeButton = true,
                                        }) => {
        // Create toast
        if (!notificationWithButton.current) {
            notificationWithButton.current = f7.notification.create({
                icon,
                title,
                subtitle,
                text,
                closeButton,
                closeTimeout,

            });
        }
        // Open it
        notificationWithButton.current.open();
    };
    const device = getDevice();
    // const {data, isLoading, error, refetch} = useQuery({
    //     queryKey: 'items', queryFn: () => getItemsList(orderBy), options: {
    //         refetchOnWindowFocus: true,
    //         staleTime: 0,
    //         cacheTime: 0,
    //         refetchInterval: 0,
    //         onSuccess: (data) => {
    //             setTableData(data.items)
    //         },
    //     }
    // });

    if (device.desktop) {
        return (
            <Page name="home" ptrMousewheel={true}>
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="text-2xl">Desktop</div>
                </div>
            </Page>
        )
    }

    return (
        <Page name="home" ptrMousewheel={true}>
            <div className="flex flex-col justify-center items-center h-full">
                <div className="text-2xl">Mobile</div>
            </div>
        </Page>
    )
};
export default HomePage;
