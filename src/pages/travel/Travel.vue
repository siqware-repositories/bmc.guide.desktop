<template>
  <q-page class="q-pa-sm">
    <q-card square flat bordered>
      <q-banner inline-actions class="bg-white text-primary">
        <q-icon name="more_vert" size="25px"/>
        <strong>Travel</strong>
        <template v-slot:action>
          <q-btn flat round dense icon="add" class="q-mr-xs" @click="$refs.addTravel.show()">
            <q-tooltip>
              Add Travel
            </q-tooltip>
          </q-btn>
          <q-btn flat round dense icon="category" @click="$refs.travelCategory.show()">
            <q-tooltip>
              Travel Category
            </q-tooltip>
          </q-btn>
        </template>
      </q-banner>
      <q-separator color="grey-3"/>
      <q-card-section>
        <q-list separator>
          <q-item v-for="(i,index) in getTravel" :key="index" class="shadow-2 q-my-xs" v-ripple clickable>
            <q-item-section avatar top>
              <q-avatar square>
                <img :src="i.thumbnail">
              </q-avatar>
            </q-item-section>
            <q-item-section top>
              <q-item-label class="q-mt-sm">{{i.title}}</q-item-label>
            </q-item-section>
            <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn size="12px" color="positive" flat dense round icon="edit" @click="$refs.editTravel.show(i)"/>
                <q-btn size="12px" color="negative" @click="destroyTravel(i.id)" flat dense round icon="delete"/>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <!-- add course-->
    <TravelAdd ref="addTravel"/>
    <!--edit course-->
    <TravelEdit ref="editTravel"/>
    <!--Travel Category-->
    <TravelCategory ref="travelCategory"/>
  </q-page>
</template>

<script>
    import TravelAdd from "pages/travel/TravelAdd";
    import TravelEdit from "pages/travel/TravelEdit";
    import TravelCategory from "pages/travel/TravelCategory";

    export default {
        components: {TravelCategory, TravelEdit, TravelAdd},
        data() {
            return {
                confirm: false,
                editCourse: false,
                maximizedToggle: false,
                optionGradeDetail: [],
                optionSubject: [],
                optionSubjectClone: [],
                optionUsers: [],
                data: {
                    id: null,
                    uid: 1,
                    grade_detail: '',
                    teacher: null,
                    subject: null,
                    description: '',
                    subject_details: [],
                }
            };
        },
        computed: {
            getTravel() {
                return this.$store.getters["travel/getTravel"];
            }
        },
        async created() {
            await this.$store.dispatch("travel/indexTravel");
            await this.$store.dispatch("travel_category/indexTravelCategory");
        },
        methods: {
            destroyTravel(id) {
                let self = this;
                self.$q
                    .dialog({
                        title: "Confirm",
                        message: "Do you want to delete?",
                        cancel: true,
                        persistent: true
                    })
                    .onOk(() => {
                        self.$store.dispatch("travel/deleteTravel", id).then(function () {
                            self.$store.dispatch("travel/indexTravel").then(function () {
                                self.$q.notify({
                                    message: "Was deleted",
                                    position: "top",
                                    color: "negative"
                                });
                            });
                        });
                    });
            },
        }
    };
</script>

<style>
</style>
