
import { defineComponent, onMounted } from 'vue';
import { scaleContainer } from '@/utils/utils.js'
import TopBar from '../TopBar';

import './style.less'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '测试'
    },
    mapType: {
      type: String,
      default: '3D'
    },
    locate: {
      type: String,
      default: ''
    }
  },
  slots: {
    default: () => '',
  },
  setup(props, {slots}) {

    onMounted(() => {
      scaleContainer();
      window.onresize = () => {
        scaleContainer();
      };
    });

    const getImgUrl = () => {
      const urls = {
        '3D': `url(${new URL('@/assets/district-level/bj-1-1.jpg', import.meta.url).href})`,
        'GIS': `url(${new URL('@/assets/district-level/bj-1-2.jpg', import.meta.url).href})`,
        'VIG': `url(${new URL('@/assets/village-level/pic-4.png', import.meta.url).href})`
      };
      return urls[props.mapType]
    };
   
    return () => {
      const { title, mapType, locate } = props;
      return (
        <div class="screen-out-box">
          <div
            class="basic-container"
            style={{
              background: getImgUrl()
            }}
          >
            <div
              class="global-bg-shadow"
              style={{
                background: {
                  'GIS': 'radial-gradient(ellipse closest-side, #ffffff00 54%, #051525)',
                  'VIG': 'radial-gradient(ellipse closest-side, #ffffff00, #051525)',
                  '3D': 'radial-gradient(ellipse, #ffffff00, #051525)',
                }[mapType]
              }}
            ></div>
            <TopBar title={title} locate={locate} isBack={mapType === 'VIG'} />
            <div class="content">
              {slots?.default?.()}
            </div>
            <div className="bottom-under-img"></div>
          </div>
        </div>
      )
    }
  },
})
