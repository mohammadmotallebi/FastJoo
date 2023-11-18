import React, {useEffect} from 'react';
import {Block, Button, List, ListInput, ListItem, Navbar, Page, Preloader} from "framework7-react";
import {useQuery,} from 'react-query'
import {fetchBrands, fetchTypes} from "@/api/API";
import Dom7 from "dom7";
import Compressor from 'compressorjs';

const $$ = Dom7;
export function AddItem() {

    const {data, error, status} = useQuery('data', () => {
        return Promise.all([fetchTypes(), fetchBrands()])
    })


    if (status === 'loading') return (
        <Page>
            <Navbar title="add item" backLink="Back"/>
            <Block strong className={'text-align-center'}>
                <Preloader color="multi" size={50}/>
            </Block>
        </Page>
    )
    else
        return (
            <Page>
                <Navbar title="add item" backLink="Back"/>
                <List strongIos dividersIos insetIos>
                    <ListItem title="Type"

                              smartSelect
                              smartSelectParams={{
                                  openIn: 'popup',
                                  searchbar: true,
                                  searchbarPlaceholder: 'Search item',
                                  popupCloseLinkText: 'Close',
                                  closeOnSelect: true,
                                  scrollToSelectedItem: true,
                                  popupPush: true,
                                  appendSearchbarNotFound: `  <div class="list list-strong-ios list-dividers-ios inset-ios">

      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Name</div>
            <div class="item-input-wrap">
              <input type="text" placeholder="Your name">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        </ul>
        </div>

`
                              }}


                    >
                        <select name="types" defaultValue='none'>
                            {status === 'success' && data[0].map((type, index) => (
                                <option key={index} value={type.id}>{type.type_name}</option>
                            ))}
                        </select>
                    </ListItem>
                    <ListItem title="Brand"
                              smartSelect
                              smartSelectParams={{
                                  openIn: 'popup',
                                  searchbar: true,
                                  searchbarPlaceholder: 'Search item',
                                  popupCloseLinkText: 'Close',
                                  closeOnSelect: true,
                                  scrollToSelectedItem: true,
                                  popupPush: true,
                                  appendSearchbarNotFound: `  <div class="list list-strong-ios list-dividers-ios inset-ios">
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Name</div>
            <div class="item-input-wrap">
              <input type="text" placeholder="Your name">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        </ul>
        </div>

`
                              }}


                    >
                        <select name="brands" defaultValue='none'>
                            {status === 'success' && data[1].map((brand, index) => (
                                <option key={index} value={brand.id}>{brand.brand_name}</option>
                            ))}
                        </select>
                    </ListItem>

                    <ListInput label="Model" type="text" placeholder="Item Model" clearButton/>

                    <ListInput label="Serial Number" type="text" placeholder="Item Serial Number" clearButton/>

                    <ListInput label="Discription" type="textarea" placeholder="Discribe Item Status" tex clearButton/>

                    <ListInput label="Quantity" type="number" placeholder="Item Quantity" clearButton/>

                    {/*Image upload*/}
                    <ListItem>
                        <ListInput type="file" style={{display: 'none'}} multiple
                                   accept="image/*"/>
                        <Button className="col" raised fill onClick={(e) => {
                            e.preventDefault();
                            $$('input[type=file]').click();
                            $$('input[type=file]').on('change', function (e) {
                                const file = e.target.files;

                                // if (!file) {
                                //     return;
                                // }
                                //
                                // new Compressor(file, {
                                //     quality: 0.6,
                                //
                                //     // The compression process is asynchronous,
                                //     // which means you have to access the `result` in the `success` hook function.
                                //     success(result) {
                                //         const formData = new FormData();
                                //
                                //         // The third parameter is required for server
                                //         formData.append('file', result, result.name);
                                //
                                //         // Send the compressed image file to server with XMLHttpRequest.
                                        console.log(file)
                                    // },
                                    // error(err) {
                                    //     console.log(err.message);
                                    // },
                            // });
                            })
                        }}>Upload Image</Button>
                    {/*Selected Image*/}
                    <div className="col">
                        <img src="" alt="" id="selectedImage" style={{width: '100%', height: '100%'}}/>
                    </div>
                    </ListItem>


                </List>
            </Page>
        )

}