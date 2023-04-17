import { HelmetProvider } from "react-helmet-async"

const Meta = ({ title, description, keywords }) => {


  return (
    <HelmetProvider>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keyword" content={keywords} />
    </HelmetProvider>
  )
}

Meta.defaultProps = {
    title: 'UltraShop',
    description: 'Best electronic items at a reasonable price',
    keywords: 'electronics, fun, necessities, technology'
}

export default Meta
