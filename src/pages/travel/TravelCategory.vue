<template>
  <q-dialog
    v-model="confirm"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar>
        <div>Travel Category</div>

        <q-space/>

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="row items-center">
        <q-form class="full-width" @submit="storeTravelCategory">
          <div class="row q-col-gutter-xs">
            <div class="col-12">
              <q-input
                ref="category"
                square
                outlined
                dense
                v-model="data.name"
                label="Category"
                lazy-rules
                autocomplete="off"
                :rules="[ val => !!val || 'Please type something']"
              >
                <q-tooltip>
                  Type and hit enter to add!
                </q-tooltip>
              </q-input>
            </div>
          </div>
        </q-form>
        <q-list bordered class="full-width" separator>
          <q-item-label header>Categories</q-item-label>

          <q-item v-for="(i,index) in getCategory" :key="index" clickable v-ripple>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">{{i.name}}</span>
              </q-item-label>
            </q-item-section>

            <q-item-section top side>
              <div class="text-grey-8">
                <q-btn size="12px" flat dense round icon="delete" @click="destroyTravelCategory(i.id)"/>
              </div>
            </q-item-section>
          </q-item>

          <q-banner class="bg-grey-3" v-if="!getCategory.length">
            <template v-slot:avatar>
              <q-icon name="info" color="negative" />
            </template>
            No category!.
            <template v-slot:action>
              <q-btn flat color="primary" label="Add Category" @click="$refs.category.$el.focus()"/>
            </template>
          </q-banner>

        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
    export default {
        name: 'TravelCategory',
        data() {
            return {
                confirm: false,
                data: {
                    name: '',
                }
            };
        },
        computed: {
            getCategory(){
                return this.$store.getters['travel_category/getTravelCategory']
            }
        },
        async created() {
        },
        methods: {
            show() {
                this.confirm = true
            },
            storeTravelCategory(){
                let self =  this;
                self.$q.loading.show();
                self.$store.dispatch('travel_category/storeTravelCategory',self.data).then(function (data) {
                    self.onReset();
                    self.$q.loading.hide();
                    self.$q.notify({
                        message: "Was Added",
                        position: "top",
                        color: "positive"
                    });
                });
            },
            destroyTravelCategory(id) {
                let self = this;
                self.$q
                    .dialog({
                        title: "Confirm",
                        message: "Do you want to delete?",
                        cancel: true,
                        persistent: true
                    })
                    .onOk(() => {
                        self.$store.dispatch("travel_category/deleteTravelCategory", id).then(function () {
                            self.$store.dispatch("travel_category/indexTravelCategory").then(function () {
                                self.$q.notify({
                                    message: "Was deleted",
                                    position: "top",
                                    color: "negative"
                                });
                            });
                        });
                    });
            },
            onReset () {
                this.data.name = null;
            }
        }
    };
</script>

<style>
</style>
