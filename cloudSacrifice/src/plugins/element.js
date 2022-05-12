import Vue from 'vue'
import {
  Container,
  Header,
  Main,
  Footer,
  Input,
  Button,
  Row,
  Menu,
  MenuItem,
  Form,
  FormItem,
  Message,
  Loading,
  MessageBox,
  Col,
  Carousel,
  CarouselItem,
  Card,
  Dialog,
  RadioGroup,
  Radio,
  Descriptions,
  DescriptionsItem,
  Tag,
  Empty,
  DatePicker,
  Divider,
  InputNumber
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Input)
Vue.use(Button)
Vue.use(Row)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Tag)
Vue.use(Empty)
Vue.use(DatePicker)
Vue.use(Divider)
Vue.use(InputNumber)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
