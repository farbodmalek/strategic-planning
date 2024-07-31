<template>
  <BaseCover :title="'شناسنامه روستا'">
    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="openModal"><i
            class="pi pi-plus ms-2"></i>افزودن شناسنامه روستا
        </Button>
      </div>
      <CmpTable :cols="cols" :products="list" :has-action="true"/>
      <!--      <DataTable :value="list" tableStyle="min-width: 50rem">-->
      <!--        <ColumnGroup type="header">-->
      <!--          <Row>-->
      <!--            <Column :rowspan="2" header="/"/>-->
      <!--            <Column header="اطلاعات جمعیتی شناختی" :colspan="4"/>-->
      <!--            <Column header="وضعیت تحصیلی" :colspan="5"/>-->
      <!--            <Column header="وضعیت شغلی" :colspan="4"/>-->
      <!--            <Column header="وضعیت جسمانی" :colspan="3"/>-->
      <!--          </Row>-->
      <!--          <Row>-->
      <!--            <Column v-for="col in cols" :header="col.header" :field="col.field"/>-->
      <!--          </Row>-->
      <!--        </ColumnGroup>-->
      <!--        <Column header="jfgdjkg" field="age15To64"/>-->
      <!--      </DataTable>-->
    </div>


    <Dialog v-model:visible="visible" :draggable="false" modal
            :header="isEdit?'ویرایش شناسنامه روستا':'افزودن شناسنامه روستا'"
            :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

      <div class="tab-list m-auto justify-content-center d-flex mx-2 my-2 pb-3">
        <button v-for="i in InfoTab" :key="i.id" @click="setTab(i.id)" :class="['tab-button', { active: Tabnumber === i.id }]">{{ i.title }}</button>
      </div>

      <TabPanel v-if="Tabnumber===1">
        <div class="row mx-md-5 mx-2 my-2">

          <div class="d-flex flex-column gap-2 col-12 col-md-6  col-lg-4 my-1 ">
            <label class="required" >  نام استان </label>
            <Dropdown v-model="formValue.country" :options="countryList" optionLabel="title"
                      placeholder="انتخاب کنید" @change="getCity(formValue.country)"
                      option-value="id"
                      class="w-100 md:w-14rem  shadow-lg"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required" > نام شهرستان </label>
            <Dropdown v-model="formValue.city" :options="cityList" optionLabel="title" placeholder="انتخاب کنید"
                      @change="getdistrict(formValue.city)"
                      option-value="id"
                      class="w-100 md:w-14rem  shadow-lg"
                      />
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required" > نام بخش </label>
            <Dropdown v-model="formValue.district" :options="districtList" optionLabel="title"
                      @change="getVillage(formValue.district)"
                      placeholder="انتخاب کنید"
                      option-value="id"
                      class="w-100 md:w-14rem  shadow-lg"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required" > نام دهستان </label>
            <Dropdown v-model="formValue.village" :options="villageList" optionLabel="title"
                      @change="getHamlet(formValue.village)"
                      placeholder="انتخاب کنید"
                      option-value="id"
                      class="w-100 md:w-14rem  shadow-lg"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required" > نام آبادی</label>
            <Dropdown v-model="formValue.countryDevisionId" :options="hamletlist" optionLabel="title"
                      placeholder="انتخاب کنید"
                      option-value="id"
                      class="w-100 md:w-14rem  shadow-lg"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required" > جمعیت</label>
            <InputNumber :min="0" v-model="formValue.population" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required" > تعداد کل شاغلان </label>
            <InputNumber :min="0" v-model="formValue.activeCount" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required" > تعداد کل بیکاران  </label>
            <InputNumber :min="0" v-model="formValue.unEmployedCount" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label  class="required">   عمده فعالیت</label>
            <InputText v-model="formValue.usualActivity" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required" >  تعداد خانوار</label>
            <InputNumber :min="0" v-model="formValue.familyCount" class=" shadow-lg w-100"
            />
          </div>

          <div class="-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required" > توضیحات  </label>
            <Textarea v-model="formValue.description" rows="1" class=" shadow-lg w-100"/>
          </div>
        </div>

      </TabPanel>

      <TabPanel v-if="Tabnumber===2">
        <label class="font-weight-bold   text-md my-2">جمعیت مرد : </label>
        <div class="row mx-0">
          <div class="d-flex flex-column gap-2 col-12 col-md-6  col-lg-4 my-1">
            <label class="required">  نوع جمعیت </label>
            <Dropdown v-model="formWoman.hamletDetailType" :options="genderType" optionLabel="title"
                      placeholder="انتخاب کنید"
                      option-value="id"
                      class="w-100 md:w-14rem  shadow-lg"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> سن 14-0</label>
            <InputNumber :min="0" v-model="formWoman.age0To14" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  سن 15 - 64</label>
            <InputNumber :min="0" v-model="formWoman.age15To64" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> سن بیشتر از 65</label>
            <InputNumber :min="0" v-model="formWoman.upper65" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد بیسواد</label>
            <InputNumber :min="0" v-model="formWoman.withoutEducation" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> بدون دیپلم</label>
            <InputNumber :min="0" v-model="formWoman.withoutDiploma" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  دیپلم </label>
            <InputNumber :min="0" v-model="formWoman.diploma" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> کاردانی  </label>
            <InputNumber :min="0" v-model="formWoman.associate" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> لیسانس </label>
            <InputNumber :min="0" v-model="formWoman.bachelor" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> فوق لیسانس </label>
            <InputNumber :min="0" v-model="formWoman.masterCount" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> دکتری  </label>
            <InputNumber :min="0" v-model="formWoman.doctorate" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> فوق دکتری </label>
            <InputNumber :min="0" v-model="formWoman.uperDoctorate" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  تعداد بیکار</label>
            <InputNumber :min="0" v-model="formWoman.unEmployed" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد شاغلین قراردادی</label>
            <InputNumber :min="0" v-model="formWoman.contract" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  تعداد شاغلین فصلی</label>
            <InputNumber :min="0" v-model="formWoman.season" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد شاغلین پروژه ای </label>
            <InputNumber :min="0" v-model="formWoman.project" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد سالم</label>
            <InputNumber :min="0" v-model="formWoman.okPhisicalCondition" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد ناتوان جسمی</label>
            <InputNumber :min="0" v-model="formWoman.disablePhisicalCondition" class=" shadow-lg w-100"/>
          </div>
        </div>
      </TabPanel>


      <TabPanel v-if="Tabnumber===3">
        <label class="font-weight-bold  text-md my-2">جمعیت زن : </label>
        <div class="row mx-0">
          <div class="d-flex flex-column gap-2 col-12 col-md-6  col-lg-4 my-1">
            <label class="required">  نوع جمعیت </label>
            <Dropdown v-model="formMan.hamletDetailType" :options="genderType" optionLabel="title"
                      placeholder="انتخاب کنید"
                      option-value="id"
                      class="w-100 md:w-14rem  shadow-lg"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  سن 14-0</label>
            <InputNumber :min="0" v-model="formMan.age0To14" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  سن 15 - 64</label>
            <InputNumber :min="0" v-model="formMan.age15To64" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> سن بالای از 64 </label>
            <InputNumber :min="0" v-model="formMan.upper65" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  تعداد بیسواد</label>
            <InputNumber :min="0" v-model="formMan.withoutEducation" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> بدون دیپلم</label>
            <InputNumber :min="0" v-model="formMan.withoutDiploma" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  دیپلم </label>
            <InputNumber :min="0" v-model="formMan.diploma" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> کاردانی  </label>
            <InputNumber :min="0" v-model="formMan.associate" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> لیسانس </label>
            <InputNumber :min="0" v-model="formMan.bachelor" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> فوق لیسانس </label>
            <InputNumber :min="0" v-model="formMan.masterCount" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> دکتری  </label>
            <InputNumber :min="0" v-model="formMan.doctorate" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  فوق دکتری </label>
            <InputNumber :min="0" v-model="formMan.uperDoctorate" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد بیکار</label>
            <InputNumber :min="0" v-model="formMan.unEmployed" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد شاغلین قراردادی</label>
            <InputNumber :min="0" v-model="formMan.contract" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد شاغلین فصلی</label>
            <InputNumber :min="0" v-model="formMan.season" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد شاغلین پروژه ای </label>
            <InputNumber :min="0" v-model="formMan.project" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد سالم</label>
            <InputNumber :min="0" v-model="formMan.okPhisicalCondition" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد ناتوان جسمی</label>
            <InputNumber :min="0" v-model="formMan.disablePhisicalCondition" class=" shadow-lg w-100"/>
          </div>

        </div>
      </TabPanel>


      <TabPanel v-if="Tabnumber===4">
        <label class="font-weight-bold text-md my-2">جمعیت زنان سرپرست خانوار : </label>
        <div class="row mx-0">
          <div class="d-flex flex-column gap-2 col-12 col-md-6  col-lg-4 my-1">
            <label class="required">  نوع جمعیت </label>
            <Dropdown v-model="WomenSupervisors.hamletDetailType" :options="genderType" optionLabel="title"
                      placeholder="انتخاب کنید"
                      option-value="id"
                      class="w-100 md:w-14rem  shadow-lg"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> سن 14-0</label>
            <InputNumber :min="0" v-model="WomenSupervisors.age0To14" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  سن 15 - 64</label>
            <InputNumber :min="0" v-model="WomenSupervisors.age15To64" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> سن بالای از 64 </label>
            <InputNumber :min="0" v-model="WomenSupervisors.upper65" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد بیسواد</label>
            <InputNumber :min="0" v-model="WomenSupervisors.withoutEducation" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> بدون دیپلم</label>
            <InputNumber :min="0" v-model="WomenSupervisors.withoutDiploma" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required">  دیپلم </label>
            <InputNumber :min="0" v-model="WomenSupervisors.diploma" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> کاردانی </label>
            <InputNumber :min="0" v-model="WomenSupervisors.associate" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> لیسانس </label>
            <InputNumber :min="0" v-model="WomenSupervisors.bachelor" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> فوق لیسانس </label>
            <InputNumber :min="0" v-model="WomenSupervisors.masterCount" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> دکتری  </label>
            <InputNumber :min="0" v-model="WomenSupervisors.doctorate" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> فوق دکتری  </label>
            <InputNumber :min="0" v-model="WomenSupervisors.uperDoctorate" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد بیکار</label>
            <InputNumber :min="0" v-model="WomenSupervisors.unEmployed" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد شاغلین قراردادی</label>
            <InputNumber :min="0" v-model="WomenSupervisors.contract" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد شاغلین فصلی</label>
            <InputNumber :min="0" v-model="WomenSupervisors.season" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد شاغلین پروژه ای </label>
            <InputNumber :min="0" v-model="WomenSupervisors.project" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد سالم</label>
            <InputNumber :min="0" v-model="WomenSupervisors.okPhisicalCondition" class=" shadow-lg w-100"/>
          </div>

          <div class="d-flex flex-column gap-2 col-12 col-md-6 col-lg-4 my-1">
            <label class="required"> تعداد ناتوان جسمی</label>
            <InputNumber :min="0" v-model="WomenSupervisors.disablePhisicalCondition" class=" shadow-lg w-100"/>
          </div>

        </div>
      </TabPanel>


      <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-5">
        <Button class="bg-success rounded" @click="isEdit?editHamletInformation():addHamletInformation()"><i
            class="pi pi-check ms-3"></i>ثبت
        </Button>
        <Button class="bg-danger rounded" @click="visible=false"><i class="pi pi-times ms-3"></i>انصراف</Button>
      </div>


    </Dialog>

    <Dialog v-model:visible="showDetails" :draggable="false" modal header="جزییات " :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="bg-white my-3 py-3 rounded mx-2" v-for="item in details" :key="item.id">
                <span
                    class="text-green font-weight-bold y px-4 bg-primary py-1  text-white border-radius-sm">
              <i class="pi pi-user"></i>
                  {{
                    item.hamletDetailType === 1 ? 'مرد' : item.hamletDetailType === 2 ? 'زن' : 'زنان سرپرست خانوار'
                  }} </span>
        <div class="row mx-0  my-4 justify-content-between">
          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold">سن 0 تا 14 : </span>
            <span>{{ item.age0To14 }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold">سن 15 تا 64    : </span>
            <span>{{ item.age15To64 }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span
              class="font-weight-bold">سن بیشتر از 65   : </span>
            <span>{{ item.upper65 }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold">  تعداد بیسواد :   </span>
            <span> {{ item.withoutEducation }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold"> تعداد زیر دیپلم :    </span>
            <span> {{ item.withoutDiploma }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold">  تعداد دیپلم :  </span>
            <span> {{ item.diploma }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold">  تعداد فوق دیپلم :  </span>
            <span> {{ item.associate }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold">   تعداد کارشناسی : </span>
            <span> {{ item.bachelor }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span
              class="font-weight-bold">  تعداد کارشناسی ارشد :  </span>
            <span> {{ item.masterCount }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold">  تعداد دکترا :  </span>
            <span> {{ item.doctorate }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold"> تعداد فوق دکترا :  </span>
            <span> {{ item.uperDoctorate }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold"> تعداد بیکار :      </span>
            <span> {{ item.unEmployed }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span
              class="font-weight-bold"> تعداد شاغل قراردادی : </span>
            <span> {{ item.contract }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span
              class="font-weight-bold"> تعداد شاغل پروژه ای : </span>
            <span> {{ item.project }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold"> تعداد شاغل فصلی :  </span>
            <span> {{ item.season }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold"> تعداد سالم : </span>
            <span> {{ item.okPhisicalCondition }}</span></div>

          <div class="col-12 col-md-4 my-3 d-flex text-sm "><span class="font-weight-bold"> تعداد ناتوان جسمی:  </span>
            <span> {{ item.disablePhisicalCondition }}</span></div>
        </div>
      </div>
    </Dialog>
  </BaseCover>
</template>

<script setup lang="ts">
import {BaseInfoServices} from "~/core/basic-info-management/base-info-services";
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {required} from '@vuelidate/validators';
import {useVuelidate} from "@vuelidate/core";
import {ref, computed} from 'vue'

const visible = ref(false)
const isEdit = ref(false)
const showDetails = ref(false)
const list = ref([])
const countryList = ref([])
const cityList = ref([])
const districtList = ref([])
const villageList = ref([])
const hamletlist = ref([])
const Tabnumber = ref(1)
const activeTab = ref(1)
const submitted = ref<boolean>(false);

const genderType = ref([
  {id: 1, title: 'مرد'},
  {id: 2, title: 'زن'},
  {id: 3, title: 'زنان سرپرست خانوار'},
])

const InfoTab = ref([
  {id: 1, title: 'جمعیت استان  '},
  {id: 2, title: 'جمعیت مرد '},
  {id: 3, title: 'جمعیت زن '},
  {id: 4, title: 'جمعیت زنان سرپرست خانوار '},
])

const cols = ref([
  // {id: 1, field: "hamletDetailType", header: 'نوع جمعیت'},
  {id: 1, field: "index", header: 'ردیف'},
  {id: 1, field: "hamlet", header: 'نام آبادی'},
  {id: 2, field: "population", header: 'جمعیت کل'},
  {id: 3, field: "activeCount", header: 'تعداد شاغلان'},
  {id: 4, field: "unEmployedCount", header: 'تعداد بیکاران'},
  {id: 5, field: "familyCount", header: 'تعداد خانوار'},
])


const values = ref({
  country: null,
  city: null,
  district: null,
  village: null,
  countryDevisionId: null,
})

const formMan = ref({
  age0To14: null,
  age15To64: null,
  upper65: null,
  withoutEducation: null,
  withoutDiploma: null,
  associate: null,
  bachelor: null,
  masterCount: null,
  doctorate: null,
  unEmployed: null,
  contract: null,
  project: null,
  season: null,
  okPhisicalCondition: null,
  disablePhisicalCondition: null,
  otherPhisicalCondition: 1,
  diploma: null,
  uperDoctorate: null,
  hamletDetailType: null,
})

const formWoman = ref({
  age0To14: null,
  age15To64: null,
  upper65: null,
  withoutEducation: null,
  withoutDiploma: null,
  associate: null,
  bachelor: null,
  masterCount: null,
  doctorate: null,
  unEmployed: null,
  contract: null,
  project: null,
  season: null,
  okPhisicalCondition: null,
  disablePhisicalCondition: null,
  otherPhisicalCondition: 1,
  diploma: null,
  uperDoctorate: null,
  hamletDetailType: null,
})

const WomenSupervisors = ref({
  age0To14: null,
  age15To64: null,
  upper65: null,
  withoutEducation: null,
  withoutDiploma: null,
  associate: null,
  bachelor: null,
  masterCount: null,
  doctorate: null,
  unEmployed: null,
  contract: null,
  project: null,
  season: null,
  okPhisicalCondition: null,
  disablePhisicalCondition: null,
  otherPhisicalCondition: 1,
  diploma: null,
  uperDoctorate: null,
  hamletDetailType: null,

})

const setTab = (id: number) => {
  Tabnumber.value = id
  activeTab.value = id;
}

const openModal = () => {
  visible.value = true
  getCountryDevision()
}


const getCountryDevision = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(1), true, result => {
    if (result) {
      countryList.value = result
    }
  });
}

const getCity = (id:any) => {
  const body = {
    ParentId: id,
    CountryDevisionTypeId: 2,
  }
  MakeResponse.makeServerResponse(CommonServices.getParentDevision(body), true, result => {
    if (result) {
      cityList.value = result
    }
  });
}

const getdistrict = (id:any) => {
  const body = {
    ParentId: id,
    CountryDevisionTypeId: 3,
  }
  MakeResponse.makeServerResponse(CommonServices.getParentDevision(body), true, result => {
    if (result) {
      districtList.value = result
    }
  });
}

const getVillage = (id) => {
  const body = {
    ParentId: id,
    CountryDevisionTypeId: 4,
  }
  MakeResponse.makeServerResponse(CommonServices.getParentDevision(body), true, result => {
    if (result) {
      villageList.value = result
    }
  });
}

const getHamlet = (id) => {
  const body = {
    ParentId: id,
    CountryDevisionTypeId: 5,
  }
  MakeResponse.makeServerResponse(CommonServices.getParentDevision(body), true, result => {
    if (result) {
      hamletlist.value = result
    }
  });
}

const formValue = ref({
  country: null,
  city: null,
  district: null,
  village: null,
  population: null,
  familyCount: null,
  activeCount: null,
  unEmployedCount: null,
  usualActivity: null,
  description: null,
  countryDevisionId: null,
})

const valids = computed(() => {
  return {
    population: {required},
    familyCount: {required},
    activeCount: {required},
    unEmployedCount: {required},
    usualActivity: {required},
    description: {required},
    countryDevisionId: {required},
  };
});
const v$ = useVuelidate(valids, formValue);

const addHamletInformation = () => {
  submitted.value = true;
  console.log('add')
  const body = {
    population: formValue.value.population,
    familyCount: formValue.value.familyCount,
    activeCount: formValue.value.activeCount,
    unEmployedCount: formValue.value.unEmployedCount,
    usualActivity: formValue.value.usualActivity,
    description: formValue.value.description,
    countryDevisionId: formValue.value.countryDevisionId,
    hamletInformationDetails: [
      formMan.value,
      formWoman.value,
      WomenSupervisors.value
    ]
  }
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(BaseInfoServices.addHamletInformation(body), true, result => {
      ToastNotificationService.success('با موفقیت ثبت شد');
      visible.value = false
      getHamletInformation()
    });
  } else {
    ToastNotificationService.error('فیلد های ستاره دار نمیتواند خالی باشد ');
  }
}

const getHamletInformation = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getHamletInformation(), true, result => {
    if (result) {
      list.value = result.map((m, index) => {
        return {
          index: index + 1,
          hamletId: m.countryDevision.id,
          villageId: m.countryDevision.parent?.id,
          districtId: m.countryDevision.parent?.parent?.id,
          cityId: m.countryDevision.parent?.parent?.parent?.id,
          countryId: m.countryDevision.parent?.parent?.parent?.parent?.id,
          activeCount: m.activeCount,
          population: m.population,
          unEmployedCount: m.unEmployedCount,
          familyCount: m.familyCount,
          hamletInformationDetails: m.hamletInformationDetails,
          usualActivity: m.usualActivity,
          description: m.description
        }
      })
    }
    list.value.forEach((x, index) => onColumnActions(index));
    visible.value = false
  });
}


const editHamletInformation = () => {
  console.log('edit')
}

const onColumnActions = (index) => {
  list.value[index].columnActions = [
    {
      id: 8,
      icon: "pi  pi-trash",
      style: "text-danger",
      label: "حذف",
      onClick(item) {

      },
    },
    {
      id: 8,
      icon: "pi  pi-file-edit",
      style: "text-success",
      label: "ویرایش",
      onClick(item) {
        openModalEdit(item)
      },
    },
    {
      id: 8,
      icon: "pi  pi-book",
      style: "text-primary",
      label: "جزییات",
      onClick(item) {
        openShowDetails(item)
      },
    },
  ];
};

const details = ref([])
const openShowDetails = (item) => {
  details.value = item.hamletInformationDetails
  showDetails.value = true
}

const openModalEdit = (item) => {
  getCountryDevision()
  console.log(item)
  visible.value = true
  isEdit.value = true
  formValue.value.country = item.countryId
  formValue.value.city = item.cityId
  formValue.value.district = item.districtId
  formValue.value.village = item.villageId
  formValue.value.population = item.population
  formValue.value.familyCount = item.familyCount
  formValue.value.activeCount = item.unEmployedCount
  formValue.value.unEmployedCount = item.unEmployedCount
  formValue.value.usualActivity = item.usualActivity
  formValue.value.description = item.description
  formValue.value.countryDevisionId = item.countryDevisionId
  item.hamletInformationDetails.forEach(e => {
    if (e.hamletDetailType === 1) {
      formMan.value.age0To14 = e.age0To14
      formMan.value.age15To64 = e.age15To64
      formMan.value.upper65 = e.upper65
      formMan.value.withoutEducation = e.withoutEducation
      formMan.value.withoutDiploma = e.withoutDiploma
      formMan.value.associate = e.associate
      formMan.value.bachelor = e.bachelor
      formMan.value.masterCount = e.masterCount
      formMan.value.doctorate = e.doctorate
      formMan.value.unEmployed = e.unEmployed
      formMan.value.contract = e.contract
      formMan.value.project = e.project
      formMan.value.season = e.season
      formMan.value.okPhisicalCondition = e.okPhisicalCondition
      formMan.value.disablePhisicalCondition = e.disablePhisicalCondition
      formMan.value.otherPhisicalCondition = 1
      formMan.value.diploma = e.diploma
      formMan.value.uperDoctorate = e.uperDoctorate
      formMan.value.hamletDetailType = e.hamletDetailType
    } else if (e.hamletDetailType === 2) {
      formWoman.value.age0To14 = e.age0To14
      formWoman.value.age15To64 = e.age15To64
      formWoman.value.upper65 = e.upper65
      formWoman.value.withoutEducation = e.withoutEducation
      formWoman.value.withoutDiploma = e.withoutDiploma
      formWoman.value.associate = e.associate
      formWoman.value.bachelor = e.bachelor
      formWoman.value.masterCount = e.masterCount
      formWoman.value.doctorate = e.doctorate
      formWoman.value.unEmployed = e.unEmployed
      formWoman.value.contract = e.contract
      formWoman.value.project = e.project
      formWoman.value.season = e.season
      formWoman.value.okPhisicalCondition = e.okPhisicalCondition
      formWoman.value.disablePhisicalCondition = e.disablePhisicalCondition
      formWoman.value.otherPhisicalCondition = 1
      formWoman.value.diploma = e.diploma
      formWoman.value.uperDoctorate = e.uperDoctorate
      formWoman.value.hamletDetailType = e.hamletDetailType

    } else {
      WomenSupervisors.value.age0To14 = e.age0To14
      WomenSupervisors.value.age15To64 = e.age15To64
      WomenSupervisors.value.upper65 = e.upper65
      WomenSupervisors.value.withoutEducation = e.withoutEducation
      WomenSupervisors.value.withoutDiploma = e.withoutDiploma
      WomenSupervisors.value.associate = e.associate
      WomenSupervisors.value.bachelor = e.bachelor
      WomenSupervisors.value.masterCount = e.masterCount
      WomenSupervisors.value.doctorate = e.doctorate
      WomenSupervisors.value.unEmployed = e.unEmployed
      WomenSupervisors.value.contract = e.contract
      WomenSupervisors.value.project = e.project
      WomenSupervisors.value.season = e.season
      WomenSupervisors.value.okPhisicalCondition = e.okPhisicalCondition
      WomenSupervisors.value.disablePhisicalCondition = e.disablePhisicalCondition
      WomenSupervisors.value.otherPhisicalCondition = 1
      WomenSupervisors.value.diploma = e.diploma
      WomenSupervisors.value.uperDoctorate = e.uperDoctorate
      WomenSupervisors.value.hamletDetailType = e.hamletDetailType
    }
  })
}

onMounted(() => {
  getHamletInformation()
})
</script>

<style scoped>
.tab-list button {
  padding: 10px 20px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

.tab-button {
  position: relative;
  padding-bottom: 10px;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #007bff;
}
</style>