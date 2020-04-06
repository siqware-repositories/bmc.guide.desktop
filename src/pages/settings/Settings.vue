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
        <div>Settings</div>

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
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="main_location" label="Main Location" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="main_location">
          <q-form @submit="updateMainLocation" @reset="onReset" class="full-width">
            <div class="row q-col-gutter-xs">
              <div class="col-12">
                <q-input
                  square
                  outlined
                  dense
                  v-model="data.name"
                  label="Name"
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
                  v-model="data.location_url"
                  label="Google map url"
                  lazy-rules
                  :rules="[ val => !!val || 'Please type something']"
                >
                  <q-tooltip>
                    Copy location url from Google Maps and paste it here!
                  </q-tooltip>
                </q-input>
              </div>
            </div>
            <q-separator class="q-my-sm"/>
            <div align="right">
              <q-btn flat label="Cancel" type="reset" color="primary" @click="data.subject_details = []" v-close-popup/>
              <q-btn flat label="Save" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script>
    export default {
        name: 'Settings',
        data() {
            return {
                confirm: false,
                maximizedToggle: false,
                tab:'main_location',
                data: {
                    id: null,
                    name: '',
                    location_url: '',
                }
            };
        },
        computed: {
            getSettingMainLocation(){
                return this.$store.getters['settings/getMainLoation']
            }
        },
        created() {
            let self = this;
            self.$store.dispatch('settings/indexMainLocation').then(function () {
                self.data.id = self.getSettingMainLocation.id;
                self.data.name = self.getSettingMainLocation.name;
                self.data.location_url = self.getSettingMainLocation.location_url;
            })
        },
        methods: {
            show() {
                this.confirm = true
            },
            updateMainLocation(){
                let self =  this;
                self.$q.loading.show();
                self.$store.dispatch('settings/updateMainLocation',self.data).then(function () {
                    self.$q.loading.hide();
                    self.$q.notify({
                        message: "Was Updated",
                        position: "top",
                        color: "positive"
                    });
                });
            },
        }
    };
</script>

<style>
</style>
