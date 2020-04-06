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
        <div>Edit Travel</div>

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
        <q-form @submit="updateTravel" @reset="onReset" class="full-width">
          <div class="row q-col-gutter-xs">
            <div class="col-12">
              <q-input
                square
                outlined
                dense
                v-model="data.title"
                label="Title"
                lazy-rules
                :rules="[ val => !!val || 'Please type something']"
              />
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
                    <img src="http://127.0.0.1:8000/storage/5e89e5f530d5d-1586095605.png">
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
                <q-item>
                  <q-item-section>
                    <q-item-label class="full-width ellipsis">
                      Image title
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    thumbnail
                  >
                    <img src="http://127.0.0.1:8000/storage/5e89e5f530d5d-1586095605.png">
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
                <q-item>
                  <q-item-section>
                    <q-item-label class="full-width ellipsis">
                      Image title
                    </q-item-label>
                  </q-item-section>

                  <q-item-section
                    thumbnail
                  >
                    <img src="http://127.0.0.1:8000/storage/5e89e5f530d5d-1586095605.png">
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
            </div>
          </div>
          <q-separator class="q-my-sm"/>
          <div align="right">
            <q-btn flat label="Cancel" type="reset" color="primary" @click="data.subject_details = []" v-close-popup/>
            <q-btn flat label="Save" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
    export default {
        name: 'TravelEdit',
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
                    title: '',
                    description: '',
                    location: '',
                },
                formData: new FormData(),
            };
        },
        computed: {},
        async created() {
        },
        methods: {
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
                this.data.title = data.title;
                this.data.location = data.location;
                this.data.description = data.description;
            },
            updateTravel() {
                let self = this;
                self.formData.set('title', self.data.title);
                self.formData.set('description', self.data.description);
                self.formData.set('location', self.data.location);
                self.$q.loading.show();
                this.$store.dispatch('travel/updateTravel', this.formData).then(function (data) {
                    for (let key of self.formData.keys()) {
                        // here you can add filtering conditions
                        self.formData.delete(key)
                    }
                    self.$refs.gallery.reset();
                    self.$refs.featuredImage.reset();
                    self.onReset();
                    self.$q.loading.hide();
                    self.$q.notify({
                        message: "Was Added",
                        position: "top",
                        color: "positive"
                    });
                });
            },
            onReset() {
                this.data.title = null;
                this.data.description = null;
                this.data.location = null;
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
