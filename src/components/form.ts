import { Field } from 'vant'
import { h, defineComponent } from 'vue';
import { Component, PropType} from 'vue';


const COMPONENT = {
    'Field': Field
}

type TFormConfig = {
    component: string | Component,
    props: Record<string, any>,
    ext: {
        key: string
    }
}

export const MyForm = defineComponent({
    props: {
      formList: {
        type: Array as PropType<TFormConfig[]>,
        default: () => []
      },
      modelValue: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
      }
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
      
      const formListEl = props.formList.map(formItem => {
        const { key } = formItem.ext;
        return h(
            COMPONENT[formItem.component as keyof typeof COMPONENT],
            {   
                ...formItem.props,
                key,
                modelValue: props.modelValue[key],
                'onUpdate:modelValue': (newVal: any) => {
                    console.log('newVal', key,newVal)
                   ctx.emit('update:modelValue', {
                     ...props.modelValue,
                     [key]: newVal
                   })
                },
                'onClear': (val, val1) => {
                    console.log('onClear', val, val1)
                }
            }
        )
      })

      return {
        formListEl
      }
    },
    render() {
        return h('div', {}, [
            this.formListEl
        ])
    }
})

