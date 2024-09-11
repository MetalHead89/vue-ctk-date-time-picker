<template>
  <div
    class="year-month-selector flex flex-direction-column"
    :class="{'dark': dark}"
  >
    <div class="year-month-selector__actions">
      <div
        v-if="!isMonthMode"
        class="chang-years-section"
      >
        <VBArrowButton
          type="prev"
          :disabled="years[0] <= minYear"
          @click="handlePrevYearsClick()"
        />
        <VBArrowButton
          type="next"
          :disabled="years[years.length - 1] >= maxYear"
          @click="handleNextYearsClick()"
        />
      </div>

      <CustomButton
        :color="dark ? '#757575' : '#424242'"
        :dark="dark"
        with-border
        class="back-button"
        @click="$emit('back')"
      >
        <span class="fs-16">
          ✕
        </span>
      </CustomButton>
    </div>
    <TransitionGroup
      :name="transitionYearsName"
      tag="div"
    >
      <div
        :key="transitionKey"
        class="years-month-wrapper"
      >
        <CustomButton
          v-for="(m, index) in months"
          :key="index"
          :color="color"
          :selected="currentMonth === index"
          :dark="dark"
          class="month-button"
          with-border
          @click="selectMonth(index)"
        >
          {{ m }}
        </CustomButton>

        <template
          v-for="year in years"
        >
          <CustomButton
            v-if="year > 0"
            :key="year"
            :color="color"
            :dark="dark"
            :disabled="year < minYear || year > maxYear"
            :selected="currentYear === year"
            with-border
            class="year-button"
            @click="selectYear(year)"
          >
            {{ year }}
          </CustomButton>

          <div
            v-else
            :key="year"
            class="year-button year-stub"
          />
        </template>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
  import { getMonthsShort } from '@/VueCtkDateTimePicker/modules/month'
  import CustomButton from '@/VueCtkDateTimePicker/_subs/CustomButton'
  import VBArrowButton from '@/components/arrow_button'

  const YEARS_ON_DISPLAY = 15
  const DEFAULT_MIN_YEAR = 1

  const ArrayRange = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => {
      const n = start + idx
      return n
    })
  }

  export default {
    name: 'YearMonthSelector',
    components: {
      CustomButton,
      VBArrowButton
    },
    props: {
      locale: { type: String, default: null },
      dark: { type: Boolean, default: null },
      color: { type: String, default: null },
      mode: { type: String, default: null },
      month: { type: Object, default: null },
      minDate: { type: String, default: null },
      maxDate: { type: String, default: null }
    },
    data () {
      return {
        months: null,
        years: [],
        transitionYearsName: 'slide-next',
        transitionKey: 0
      }
    },
    computed: {
      currentMonth () {
        return this.month.month
      },
      currentYear () {
        return this.month.year
      },
      isMonthMode () {
        return this.mode === 'month'
      },
      minYear () {
        return Number((this.minDate || '').split('-')[0] || DEFAULT_MIN_YEAR)
      },
      maxYear () {
        return Number((this.maxDate || '').split('-')[0])
      }
    },
    mounted () {
      if (this.isMonthMode) {
        this.getMonths()
      } else {
        this.years = this.getYears(this.month.year - Math.floor(YEARS_ON_DISPLAY / 2))
      }
    },
    methods: {
      getMonths () {
        this.years = null
        this.months = getMonthsShort(this.locale)
      },
      getYears (startYear) {
        this.months = null
        return ArrayRange(startYear, startYear + YEARS_ON_DISPLAY - 1)
      },
      selectMonth (monthNumber) {
        this.$emit('input', { month: monthNumber, year: this.currentYear })
      },
      selectYear (year) {
        this.$emit('input', { month: this.currentMonth, year: year })
      },

      handlePrevYearsClick () {
        this.transitionYearsName = 'slideprev'
        this.years = this.getYears(this.years[0] - YEARS_ON_DISPLAY)
        this.transitionKey++
      },

      handleNextYearsClick () {
        this.transitionYearsName = 'slidenext'
        this.years = this.getYears(this.years[this.years.length - 1] + 1)
        this.transitionKey++
      }
    }
  }
</script>

<style lang="scss" scoped>
  .year-month-selector{
    position: absolute;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: #424242;
    padding-bottom: 10px;
    overflow: hidden;

    &.dark {
      color: white;
      background-color: #424242;
    }
    .month-button {
      text-transform: capitalize;
    }

    .back-button {
      margin-left: auto;
    }

    &__actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      height: 56px;

      .chang-years-section {
        display: flex;
        align-items: center;
        gap: 15px;
      }
    }

    .years-month-wrapper {
      margin-top: 15px;
      padding: 0 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      row-gap: 10px;
      column-gap: 0;
      width: 100%;
      box-sizing: border-box;

      .month-button,
      .year-button {
        width: 30%;
        height: 30px;
      }
    }
  }
</style>
