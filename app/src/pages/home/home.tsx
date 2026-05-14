import {  Button, Flex, Card, Row, Col, Typography, Avatar, Space, Tag, } from 'antd'
import { HeroConfig, ProductSignals } from '@/configs/home'
import { APP_TITLE_UP, githubRepoUrl, GITHUB_AVATAR_URL } from '@/constants'
import allTools from '@/assets/allTools.png'
import './home.scss'
const { Text, Paragraph } = Typography

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="home__hero" aria-labelledby="home-hero-heading">
        <div className="home__hero-wrap">
          <Flex vertical align="center" gap="large" className="home__hero-stack">
            <div className="home__hero-main">
              <p className="home__eyebrow">{APP_TITLE_UP}</p>
              <h1 id="home-hero-heading" className="home__title">
                {HeroConfig.heading}
              </h1>
              <p className="home__lede">
                {APP_TITLE_UP}{HeroConfig.description}
              </p>
              <div className="home__hero-cta">
                <Button href="/tools" color="default" variant="solid" size="large">
                  打开工具台
                </Button>
                <Button
                  href={githubRepoUrl}
                  color="default"
                  variant="filled"
                  size="large"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Button>
              </div>
            </div>

            <Row gutter={[12, 12]} justify="center" className="home__signals-row">
              {ProductSignals.map(s => (
                <Col key={s.label} xs={24} sm={12} lg={6}>
                  <Card size="small" className="home__signal-card">
                    <Text type="secondary" className="home__signal-label">
                      {s.label}
                    </Text>
                    <Paragraph className="home__signal-value" strong>
                      {s.value}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </Flex>
        </div>
      </section>

      <div className="home__visual">
        <img src={allTools} alt="Quick Kit 工具一览" />
      </div>

      <section className="home__social" aria-label="社区与采用">
        <div className="home__section-inner">
          <Paragraph type="secondary" className="home__social-lead">
            深受开发者与创作者信赖
          </Paragraph>
          <Space size="middle" align="center" wrap className="home__social-inner">
            <Avatar.Group max={{count: 6}} size={48}>
              <Avatar style={{ backgroundColor: '#f56a00' }} src={GITHUB_AVATAR_URL}>
                zeMinng
              </Avatar>
            </Avatar.Group>
            <Tag className="home__social-tag">+1</Tag>
          </Space>
        </div>
      </section>
    </div>
  )
}

export default Home
