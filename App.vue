<script>
	export default {
		methods:{
			...mapMutations(['login'])
		},
		onLaunch: function() {
			var userInfo = uni.getStorageSync('userInfo') || '';
			if(userInfo.id){
				this.login(userInfo);
			}
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
</style>
