import { Helmet } from "react-helmet"

const Meta = ({ title, description, keywords }) => {


  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keyword" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'UltraShop',
    description: 'Best electronic items at a reasonable price',
    keywords: 'electronics, fun, necessities, technology'
}

export default Meta
