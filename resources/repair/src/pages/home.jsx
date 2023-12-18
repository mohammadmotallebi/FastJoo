import React, {useEffect} from 'react';
import {
    Page,
    Navbar,
    Block,
    BlockTitle,
    Button, f7, Icon, Preloader, BlockHeader, BlockFooter, Input, Card, CardHeader, CardContent, NavRight, Link, NavLeft, useStore
} from 'framework7-react';
import {getDevice, Dom7} from 'framework7';
import config from "../config";
import {useQuery} from "react-query";
import {getItemsList, deleteItemById} from "../api/API";
import {Divider, Steps} from 'rsuite';
import { Grid, Row, Col } from 'rsuite';
import store from "../js/store";


const $$ = Dom7;
const HomePage = ({f7router}) => {

    const [items, setItems] = React.useState(null);
    const [tableData, setTableData] = React.useState([]);
    const notificationWithButton = React.useRef(null);
    const [orderBy, setOrderBy] = React.useState({order: 'asc', by: 'name'});
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
    const {data, isLoading, error, refetch} = useQuery({queryKey:'items', queryFn: () =>  getItemsList(orderBy), options:{
        refetchOnWindowFocus: true,
        staleTime: 0,
        cacheTime: 0,
        refetchInterval: 0,
        onSuccess: (data) => {
            setTableData(data.items)
        },
    }});
    const handleDelete = (id) => {
        f7.dialog.confirm('Are you sure you want to delete this item?', () => {
            deleteItemById(id).then((res) => {
                if (res.success) {
                    showNotificationWithButton({
                        title: 'Success',
                        text: 'Item deleted successfully',
                        closeTimeout: 2000,
                        icon: '<i class="icon f7-icons color-green">checkmark_alt_circle_fill</i>',
                    })

                    refetch()
                }
            }).catch((err) => {
                showNotificationWithButton({
                    title: 'Error',
                    text: err.message,
                    closeTimeout: 2000,
                    icon: '<i class="icon f7-icons color-red">xmark_circle_fill</i>',
                })
            })
        });
    };
    // Sortable Table
    // Dom7(document).on('click', '.sortable-cell', function (e) {
    //     $$(this).toggleClass('sortable-asc');
    //     const order = $$(this).hasClass('sortable-asc') ? 'asc' : 'desc';
    //     const by = $$(this).data('sort-id');
    //     console.log(order, by)
    //     setOrderBy({order, by})
    // })

    const handleSort = async (e) => {
        let order = 'asc';
        if($$(e.target).hasClass('sortable-desc')) {
            order = 'desc'
        }
        if($$(e.target).hasClass('sortable-asc')){
            order = 'asc'
        }

        const by = $$(e.target).data('sort-id');
        console.log(order, by)
        await getItemsList({order, by}).then((res) => {
            setTableData(res.items)
        })
    }

    const loadData = async (done) => {
        await refetch(orderBy).then((res) => {
            console.log('TData',res)
            setTableData(res.data.items)
        })
        console.log(data)
        if (isLoading) {
            setItems(<Block className={'text-align-center'}><Preloader color="multi" size={50}/> </Block>);
        }
        if (error) {
            setItems(<Block inset strong className={'text-align-center'}>Error Loading Items</Block>);
        }
        if (!isLoading && data) {
            if (data.items?.length === 0) {
                setItems(<Block inset strong className={'text-align-center'}>No Items Found</Block>);
            } else {
                if(!device.desktop){
                    setItems(data.items?.map((item, index) => (
                        <Block strong key={index}>
                            <BlockHeader><h4>{item.name}</h4></BlockHeader>
                            <Grid fluid>
                                <Row className="show-grid">
                                    <Col lg={6} xl={8} xxl={6}>
                                        <img src={item.images[0]?.image} width="100" height="100" style={{objectFit: 'cover', borderRadius: 5, border: '1px solid #ccc'}} alt=""/>
                                    </Col>
                                    <Col lg={18} xl={16} xxl={18}>
                                        <p>{item.description}</p>
                                        <p>{item.serial}</p>
                                    </Col>
                                </Row>
                            </Grid>
                            <Divider/>
                            <div className="grid">
                                <Steps current={1} small>
                                    <Steps.Item title="Pending"/>
                                    <Steps.Item title="Reviewing"/>
                                    <Steps.Item title="Approved"/>
                                    <Steps.Item title="Finished"/>
                                </Steps>
                            </div>

                            <BlockFooter>
                                <Button bgColor='blue_75' color='white' onClick={() => f7router.navigate(`/edit/${item.id}`)}
                                        style={{
                                            borderRadius: '6px 6px 0 0',
                                            height: '100%',
                                            padding: '2px 12px',
                                            zIndex: 1
                                        }}
                                >
                                    <Icon f7={'pencil'} size={device.ios ? 'large' : 'small'}></Icon>
                                </Button>

                                <Button bgColor='red_75' color='white' onClick={() => handleDelete(item.id)}
                                        style={{
                                            borderRadius: '0 0 6px 6px',
                                            height: '100%',
                                            padding: '2px 12px',
                                            zIndex: 1
                                        }}
                                >
                                    <Icon f7={'trash'} size={device.ios ? 'large' : 'small'}></Icon>
                                </Button>
                            </BlockFooter>
                        </Block>
                    )));
                }
            }
            f7.ptr.done();
        }
    }
    useEffect(() => {
        loadData()
    }, [isLoading, data, f7router]);

    const handleRefresh = () => {
        loadData()
    }

    if(device.desktop){
        return (
            <Page name="home" ptrMousewheel={true} onPtrRefresh={handleRefresh} ptr>
                {/* Top Navbar */}
                {/* Top Navbar */}

                {/* Page content */}
                {!device.desktop ? <Block>
                        <Button bgColor='green_75' color='white' large onClick={() => f7router.navigate('/add/')}>
                            <Icon f7={'plus'} size={device.ios ? 'large' : 'small'} style={{marginRight: '10px'}}></Icon>
                            Add Item
                        </Button>
                    </Block> : null}

                {/*My Item with item type and brand and picture item edit and item delete*/}
                <Card className="data-table data-table-collapsible data-table-init">
                    <CardHeader>
                        <div className="data-table-actions" style={{marginRight:'auto', marginLeft:'unset'}}>
                            <Button bgColor='green_75' color='white' large onClick={() => f7router.navigate('/add/')}>
                            <Icon f7={'plus'} size={device.ios ? 'large' : 'small'} style={{marginRight: '10px'}}></Icon>
                            Add Item
                        </Button>
                        </div>
                        <Input
                            type="text"
                            placeholder="Search"
                            clearButton
                            onChange={(e) => {
                                const query = e.target.value.toLowerCase();
                                const filteredData = data.items.filter((item) => {
                                    return (
                                        item.name.toLowerCase().indexOf(query) >= 0 ||
                                        item.brand_name.toLowerCase().indexOf(query) >= 0 ||
                                        item.type_name.toLowerCase().indexOf(query) >= 0 ||
                                        item.serial.toLowerCase().indexOf(query) >= 0 ||
                                        item.model.toLowerCase().indexOf(query) >= 0
                                    );
                                });
                                console.log(filteredData)
                                setTableData(filteredData);
                            }}
                            style={{marginBottom: '10px'}}
                        />
                        {/*<div className="data-table-actions">*/}
                        {/*    <Link iconIos="f7:line_horizontal_3_decrease" iconMd="material:sort" />*/}
                        {/*    <Link iconIos="f7:ellipsis_vertical_circle" iconMd="material:more_vert" />*/}
                        {/*</div>*/}
                    </CardHeader>
                    <CardContent padding={false}>
                        <table>
                            <thead>
                            <tr>
                                <th className="label-cell text-align-center sortable-cell" data-sort-id='name'
                                    onClick={handleSort}
                                >Name</th>
                                <th className="numeric-cell text-align-center sortable-cell" data-sort-id='brand_name' onClick={handleSort}>Brand</th>
                                <th className="numeric-cell text-align-center sortable-cell" data-sort-id='type_name' onClick={handleSort}>Type</th>
                                <th className="numeric-cell text-align-center sortable-cell"  data-sort-id='model' onClick={handleSort}>Model</th>
                                <th className="numeric-cell text-align-center sortable-cell" data-sort-id='serial' onClick={handleSort}>Serial</th>
                                <th className="numeric-cell text-align-center sortable-cell">Status</th>
                                <th className="numeric-cell text-align-center" data-sortable="true">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableData?.map((item, index) => (
                                <tr key={index} style={{textAlign: 'center'}}>
                                    <td className="label-cell text-align-center">{item.name}</td>
                                    <td className="numeric-cell text-align-center">{item.brand_name}</td>
                                    <td className="numeric-cell text-align-center">{item.type_name}</td>
                                    <td className="numeric-cell text-align-center">{item.model}</td>
                                    <td className="numeric-cell text-align-center">{item.serial}</td>
                                    <td className="numeric-cell text-align-center">
                                        {item.status === 'pending' ? <span className="badge color-red">Pending</span> : null}
                                    </td>
                                    <td className="numeric-cell" style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <Button bgColor='blue_75' color='white' onClick={() => f7router.navigate(`/edit/${item.id}`)}
                                                style={{
                                                    borderRadius: '6px 0 0 6px',
                                                    padding: '2px 12px',
                                                    zIndex: 1
                                                }}
                                        >
                                            <Icon f7={'pencil'} size={device.ios ? 'large' : 'small'}></Icon>
                                        </Button>

                                        <Button bgColor='red_75' color='white' onClick={() => handleDelete(item.id)}
                                                style={{
                                                    borderRadius: '0 6px 6px 0',
                                                    padding: '2px 12px',
                                                    zIndex: 1
                                                }}
                                        >
                                            <Icon f7={'trash'} size={device.ios ? 'large' : 'small'}></Icon>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </Page>
        )
    }

    return (
        <Page name="home" ptrMousewheel={true} onPtrRefresh={handleRefresh} ptr>
            {/* Top Navbar */}
            <Navbar large style={{
                color: 'gray',
                textAlign: 'center',
                fontFamily: 'var(--f7-font-family-kdam)',
            }} title={f7.name}/>
            {/* Page content */}
            <Block>
                <Button bgColor='green_75' color='white' large onClick={() => f7router.navigate('/add/')}>
                    <Icon f7={'plus'} size={device.ios ? 'large' : 'small'} style={{marginRight: '10px'}}></Icon>
                    Add Item
                </Button>
            </Block>
            {/*My Item with item type and brand and picture item edit and item delete*/}
            <BlockTitle>My Items</BlockTitle>
            {items}
        </Page>
    )
};
export default HomePage;