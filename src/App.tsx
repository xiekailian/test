import BentoBox from './components/BentoBox'
import TravelTrendsFeed from './components/TravelTrendsFeed'
import AutoTrendsFeed from './components/AutoTrendsFeed'
import ScienceTrendsFeed from './components/ScienceTrendsFeed'
import TopThreeCarPosts from './components/TopThreeCarPosts'

function App() {
  return (
    <div>
      <BentoBox />
      <TravelTrendsFeed />
      <AutoTrendsFeed />
      <ScienceTrendsFeed />
      <TopThreeCarPosts />
    </div>
  )
}

export default App
