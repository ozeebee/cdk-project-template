import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'

export interface PrefixableStackProps extends StackProps {
  prefix: string
}

export class PrefixableStack extends Stack {
  protected prefix: string
  
  /** 
   * generate prefixed resource ID
   */
  resId(id: string) {
    return `${this.prefix}${id}`
  }

  /**
   * generate prefixed (resource) name
   */
  resName(name: string) {
    return `${this.prefix}-${name}`
  }

  constructor(scope: Construct, id: string, props: PrefixableStackProps) {
    super(scope, id, props)
    this.prefix = props.prefix
  }
}

