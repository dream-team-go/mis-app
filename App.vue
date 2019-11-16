<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		methods:{
			...mapMutations(['login'])
		},
		onLaunch: function() {
			this.login();
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
