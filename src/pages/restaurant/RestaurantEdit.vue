<template>
  <q-dialog
    v-model="confirm"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar>
        <div>Edit Restaurant / Cafe / Hotel</div>

        <q-space/>

        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" @click="data.subject_details = []" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="row items-center">
        <q-form @submit="updateRestaurant" class="full-width">
          <div class="row q-col-gutter-xs">
            <div class="col-12">
              <q-input
                square
                outlined
                dense
                v-model="data.title"
                label="Name"
                lazy-rules
                :rules="[ val => !!val || 'Please type something']"
              />
            </div>
            <div class="col-12">
              <q-select dense outlined square v-model="data.category"
                        :options="getCategory"
                        label="Category"
                        lazy-rules
                        :rules="[ val => !!val || 'Please select something']"
                        class="full-width"
              >
                <template v-slot:after>
                  <q-btn round dense flat icon="add" @click="$refs.addCategory.show()">
                    <q-tooltip>
                      Add more category!
                    </q-tooltip>
                  </q-btn>
                </template>
              </q-select>
            </div>
            <div class="col-12">
              <q-input
                square
                outlined
                dense
                type="url"
                v-model="data.location"
                label="Google map url"
                lazy-rules
                :rules="[ val => !!val || 'Please type something']"
              />
            </div>
            <div class="col-12">
              <q-list separator>

                <q-item>
                  <q-item-section
                    thumbnail
                  >
                    <img :src="data.thumbnail">
                  </q-item-section>

                  <q-item-section top side>
                    <q-btn
                      size="12px"
                      flat
                      dense
                      round
                      icon="edit"
                      @click="isFeaturedImage = !isFeaturedImage"
                    >
                      <q-tooltip>
                        Edit Featured Image
                      </q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
                <transition
                  appear
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut"
                >
                  <q-uploader
                    v-if="isFeaturedImage"
                    label="Featured image"
                    accept="image/*"
                    ref="featuredImage"
                    :factory="factoryFnThumbnail"
                    class="full-width"
                    auto-upload
                  >
                    <template v-slot:list="scope">
                      <q-list separator>

                        <q-item v-for="file in scope.files" :key="file.name">
                          <q-item-section>
                            <q-item-label class="full-width ellipsis">
                              {{ file.name }}
                            </q-item-label>

                            <q-item-label caption>
                              Status: {{ file.__status }}
                            </q-item-label>

                            <q-item-label caption>
                              {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                            </q-item-label>
                          </q-item-section>

                          <q-item-section
                            v-if="file.__img"
                            thumbnail
                            class="gt-xs"
                          >
                            <img :src="file.__img.src">
                          </q-item-section>

                          <q-item-section top side>
                            <q-btn
                              class="gt-xs"
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              @click="scope.removeFile(file)"
                            />
                          </q-item-section>
                        </q-item>

                      </q-list>
                    </template>
                  </q-uploader>
                </transition>
              </q-list>
            </div>
            <div class="col-12">
              <q-item-label header class="q-px-none q-py-sm">Course Description</q-item-label>
              <q-editor
                v-model="data.description"
                :definitions="definitions"
                :toolbar="toolbars"
              />
            </div>
            <div class="col-12">
              <q-list separator bordered class="shadow-1 q-px-sm">
                <q-item-label header class="q-py-xs q-px-none row">
                  <div class="col-3">
                    <q-btn flat icon="perm_media" @click="isGalleries = !isGalleries" round>
                      <q-tooltip>
                        Add Gallery
                      </q-tooltip>
                    </q-btn>
                  </div>
                  <div class="col-9 self-center text-right">
                    Click gallery button to add gallery!
                  </div>
                </q-item-label>
                <q-separator class="q-mb-xs"/>
                <transition
                  appear
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut"
                >
                  <q-uploader
                    v-if="isGalleries"
                    multiple
                    auto-upload
                    label="Gallery"
                    accept="image/*"
                    ref="gallery"
                    :factory="factoryFnGallery"
                    class="full-width"
                  >
                    <template v-slot:list="scope">
                      <q-list separator>
                        <q-item v-for="file in scope.files" :key="file.name">
                          <q-item-section>
                            <q-item-label class="full-width ellipsis">
                              {{ file.name }}
                            </q-item-label>

                            <q-item-label caption>
                              Status: {{ file.__status }}
                            </q-item-label>

                            <q-item-label caption>
                              {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                            </q-item-label>
                          </q-item-section>

                          <q-item-section
                            v-if="file.__img"
                            thumbnail
                            class="gt-xs"
                          >
                            <img :src="file.__img.src">
                          </q-item-section>

                          <q-item-section top side>
                            <q-btn
                              class="gt-xs"
                              size="12px"
                              flat
                              dense
                              round
                              icon="delete"
                              @click="scope.removeFile(file)"
                            />
                          </q-item-section>
                        </q-item>

                      </q-list>
                    </template>
                  </q-uploader>
                </transition>
                <q-item-label header>
                  Gallery Lists
                </q-item-label>

                <q-item v-for="(i,index) in data.galleries.gallery_detail" :key="index">
                  <q-item-section>
                    <q-item-label class="full-width ellipsis">
                      {{getImageName(i.url)}}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    thumbnail
                  >
                    <img :src="i.url">
                  </q-item-section>

                  <q-item-section top side>
                    <q-btn
                      class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="delete"
                      @click="deleteGalleryDetail(i.id,index)"
                    />
                  </q-item-section>
                </q-item>

              </q-list>
            </div>
          </div>
          <q-separator class="q-my-sm"/>
          <div align="right">
            <q-btn flat label="Cancel" type="reset" color="primary" v-close-popup/>
            <q-btn flat label="Save" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <RestaurantCategory ref="addCategory"/>
  </q-dialog>
</template>

<script>
    import RestaurantCategory from "pages/restaurant/RestaurantCategory";
    export default {
        name: 'RestaurantEdit',
        components: {RestaurantCategory},
        data() {
            return {
                confirm: false,
                maximizedToggle: false,
                isGalleries: false,
                isFeaturedImage: false,
                definitions: {
                    addImage: {
                        tip: 'add image',
                        icon: 'image',
                        label: 'Upload',
                        handler: this.insertImg
                    },
                },
                toolbars: [
                    [
                        {
                            label: this.$q.lang.editor.align,
                            icon: this.$q.iconSet.editor.align,
                            fixedLabel: true,
                            options: ['left', 'center', 'right', 'justify']
                        }
                    ],
                    ['bold', 'italic', 'strike', 'underline'],
                    ['quote', 'unordered', 'ordered'],
                    ['addImage', 'fullscreen']
                ],
                data: {
                    id:null,
                    category:null,
                    title: '',
                    description: '',
                    location: '',
                    thumbnail: '',
                    galleries: [],
                },
                formData: new FormData(),
            };
        },
        computed: {
            getCategory(){
                let self = this;
                return self.$store.getters['restaurant_category/getRestaurantCategory'].map(function (x) {
                    return x.name
                })
            },
        },
        async created() {
        },
        methods: {
            deleteGalleryDetail(id,index){
                let self = this;
                self.$q
                    .dialog({
                        title: "Confirm",
                        message: "Do you want to delete?",
                        cancel: true,
                        persistent: true
                    })
                    .onOk(() => {
                        self.$store.dispatch("restaurant/deleteGalleryDetail", id).then(function () {
                            self.$store.dispatch("restaurant/indexRestaurant").then(function () {
                                self.$q.notify({
                                    message: "Was deleted",
                                    position: "top",
                                    color: "negative"
                                });
                                self.data.galleries.gallery_detail.splice(index,1)
                            });
                        });
                    });
            },
            getImageName(url){
                let res = url.split("/");
                return res[4]
            },
            insertImg() { // insertImg method
                let self = this;
                const post = this.post;
                // create an input file element to open file dialog
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.png, .jpg'; // file extensions allowed
                let file;
                input.onchange = _ => {
                    self.$q.loading.show();
                    const files = Array.from(input.files);
                    file = files[0];
                    let formData = new FormData();
                    formData.append('image', file);
                    self.$store.dispatch('file_upload/uploadImage', formData).then(function (data) {
                        document.execCommand('insertHTML', true, '<div><img width="100%" src="' + data.url + '" /></div>');
                        self.$q.loading.hide()
                    });
                };
                input.click()
            },
            show(data) {
                this.isFeaturedImage = false;
                this.isGalleries = false;
                this.confirm = true;
                this.data.id = data.id;
                this.data.title = data.title;
                this.data.location = data.location_url;
                this.data.description = data.description;
                this.data.thumbnail = data.thumbnail;
                this.data.galleries = data.gallery;
                this.data.category = data.category;
            },
            updateRestaurant() {
                let self = this;
                self.formData.set('title', self.data.title);
                self.formData.set('description', self.data.description);
                self.formData.set('location', self.data.location);
                self.formData.set('category',self.data.category);
                self.formData.set('id', self.data.id);
                // self.$q.loading.show();
                this.$store.dispatch('restaurant/updateRestaurant', self.formData).then(function (data) {
                    self.$store.dispatch("restaurant/indexRestaurant").then(function () {
                        for (let key of self.formData.keys()) {
                            // here you can add filtering conditions
                            self.formData.delete(key)
                        }
                        if (self.formData.has('thumbnail')&&self.formData.has('galleries[]')){
                            self.$refs.gallery.reset();
                            self.$refs.featuredImage.reset();
                        }
                        self.$q.loading.hide();
                        self.$q.notify({
                            message: "Was Updated",
                            position: "top",
                            color: "positive"
                        });
                        self.confirm = false
                    });
                });
            },
            factoryFnGallery(file) {
                let self = this;
                self.formData.append('galleries[]', file[0]);
            },
            factoryFnThumbnail(file) {
                let self = this;
                self.formData.set('thumbnail', file[0]);
            },
        }
    };
</script>

<style>
</style>
